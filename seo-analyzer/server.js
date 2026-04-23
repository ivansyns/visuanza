/**
 * Visuanza SEO Analyzer — Z17 Express Server
 * POST /analyze  { url, email, name }
 * Runs Lighthouse + Claude API → branded Spanish report → email
 */

const express      = require('express');
const cors         = require('cors');
const { execFile } = require('child_process');
const nodemailer   = require('nodemailer');
const Anthropic    = require('@anthropic-ai/sdk');
const fs           = require('fs');
const crypto       = require('crypto');
const https        = require('https');
const http         = require('http');

const app    = express();
const PORT   = process.env.PORT || 4000;
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(cors());
app.use(express.json());

// ── Email transport (Gmail SMTP) ──────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'Visuanza SEO Analyzer online' }));

// ── Main endpoint ─────────────────────────────────────────────────────────────
app.post('/analyze', async (req, res) => {
  const { url, email, name } = req.body;

  if (!url || !email) {
    return res.status(400).json({ error: 'url and email son obligatorios' });
  }

  let targetUrl;
  try {
    targetUrl = new URL(url.startsWith('http') ? url : `https://${url}`).href;
  } catch {
    return res.status(400).json({ error: 'URL no válida' });
  }

  // Respond immediately — analysis runs async (~90s)
  res.json({ message: 'Análisis en curso. Recibirás el informe en tu correo en unos minutos.' });

  const reportId   = crypto.randomBytes(6).toString('hex');
  const reportPath = `/tmp/lh-${reportId}.json`;

  console.log(`[${reportId}] Analyzing: ${targetUrl}`);

  // ── Step 1: Lighthouse ──────────────────────────────────────────────────────
  const lighthouseBin = process.env.LIGHTHOUSE_BIN || 'lighthouse';
  execFile(lighthouseBin, [
    targetUrl,
    '--output=json',
    `--output-path=${reportPath}`,
    '--chrome-flags=--headless --no-sandbox --disable-gpu',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--quiet',
  ], { timeout: 120_000 }, async (err) => {
    if (err) {
      console.error(`[${reportId}] Lighthouse error:`, err.message);
      return;
    }

    try {
      const raw    = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const scores = extractScores(raw);
      const audits = extractAuditDetails(raw);

      console.log(`[${reportId}] Lighthouse done. Fetching HTML...`);

      // ── Step 2: Fetch + trim page HTML ────────────────────────────────────
      const rawHTML    = await fetchHTML(targetUrl);
      const pageContent = trimHTML(rawHTML);

      console.log(`[${reportId}] HTML fetched. Calling Claude...`);

      // ── Step 3: Claude narrative ──────────────────────────────────────────
      const narrative = await generateNarrative(targetUrl, name, scores, audits, pageContent);

      console.log(`[${reportId}] Claude done. Sending email...`);

      // ── Step 4: Email ─────────────────────────────────────────────────────
      const html = buildEmailHTML(name || 'tu restaurante', targetUrl, scores, narrative);

      await transporter.sendMail({
        from:    `"Visuanza" <${process.env.GMAIL_USER}>`,
        to:      email,
        bcc:     process.env.IVAN_EMAIL || '',
        subject: `Tu análisis SEO gratuito — ${new URL(targetUrl).hostname}`,
        html,
      });

      console.log(`[${reportId}] Report sent to ${email}`);
    } catch (e) {
      console.error(`[${reportId}] Error:`, e.message);
    } finally {
      fs.unlink(reportPath, () => {});
    }
  });
});

// ── HTML fetcher ─────────────────────────────────────────────────────────────
function fetchHTML(targetUrl) {
  return new Promise((resolve) => {
    const client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(targetUrl, { timeout: 15_000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { if (body.length < 80_000) body += chunk; });
      res.on('end', () => resolve(body));
    });
    req.on('error', () => resolve(''));
    req.on('timeout', () => { req.destroy(); resolve(''); });
  });
}

// Trim HTML to what matters for SEO: head tags + headings + first body text
function trimHTML(html) {
  if (!html) return '(no se pudo obtener el HTML)';
  const get  = (re) => (html.match(re) || []).slice(0, 10).join('\n');
  const title    = get(/<title[^>]*>([^<]*)<\/title>/gi);
  const metas    = get(/<meta[^>]*(name|property)=[^>]*>/gi);
  const h1       = get(/<h1[^>]*>([^<]*)<\/h1>/gi);
  const h2       = get(/<h2[^>]*>([^<]*)<\/h2>/gi);
  const bodyText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 600);
  return [
    '=== TITLE ===', title || '(ninguno)',
    '=== META TAGS ===', metas || '(ninguno)',
    '=== H1 ===', h1 || '(ninguno)',
    '=== H2 ===', h2 || '(ninguno)',
    '=== TEXTO VISIBLE (primeros 600 chars) ===', bodyText,
  ].join('\n');
}

// ── Score extraction ──────────────────────────────────────────────────────────
function extractScores(lh) {
  const cats = lh.categories;
  return {
    performance:   Math.round((cats.performance?.score        ?? 0) * 100),
    accessibility: Math.round((cats.accessibility?.score      ?? 0) * 100),
    bestPractices: Math.round((cats['best-practices']?.score  ?? 0) * 100),
    seo:           Math.round((cats.seo?.score                ?? 0) * 100),
    fcp:  lh.audits['first-contentful-paint']?.displayValue   ?? '—',
    lcp:  lh.audits['largest-contentful-paint']?.displayValue ?? '—',
    cls:  lh.audits['cumulative-layout-shift']?.displayValue  ?? '—',
    tbt:  lh.audits['total-blocking-time']?.displayValue      ?? '—',
    metaDesc: lh.audits['meta-description']?.score === 1,
    titleTag: lh.audits['document-title']?.score === 1,
    mobile:   lh.audits['viewport']?.score === 1,
    https:    lh.audits['is-on-https']?.score === 1,
  };
}

function extractAuditDetails(lh) {
  // Pull the most actionable failed/warning audits for Claude to interpret
  const relevant = [
    'meta-description', 'document-title', 'viewport', 'is-on-https',
    'image-alt', 'hreflang', 'canonical', 'robots-txt', 'structured-data',
    'link-text', 'crawlable-anchors', 'font-size', 'tap-targets',
    'first-contentful-paint', 'largest-contentful-paint',
    'cumulative-layout-shift', 'total-blocking-time',
    'uses-optimized-images', 'uses-webp-images', 'render-blocking-resources',
    'unused-css-rules', 'unused-javascript',
  ];

  return relevant
    .map(id => {
      const a = lh.audits[id];
      if (!a) return null;
      return {
        id,
        title:        a.title,
        score:        a.score,
        displayValue: a.displayValue ?? null,
        description:  a.description?.split('.')[0] ?? null, // first sentence only
      };
    })
    .filter(Boolean);
}

// ── Claude narrative generation ───────────────────────────────────────────────
async function generateNarrative(url, _name, scores, audits, pageContent) {
  const auditSummary = audits
    .map(a => `- ${a.title}: score=${a.score ?? 'n/a'} | value=${a.displayValue ?? 'n/a'}`)
    .join('\n');

  const prompt = `Eres un experto en marketing digital para restaurantes. Vas a escribir un análisis para el dueño de un restaurante — una persona no técnica, probablemente mayor de 40 años, que solo quiere saber si su web le ayuda a conseguir más clientes.

CONTENIDO REAL DE LA PÁGINA:
${pageContent}

DATOS MEDIDOS (reales, no los inventes ni los cambies):
- Velocidad: ${scores.performance}/100
- SEO: ${scores.seo}/100
- Accesibilidad: ${scores.accessibility}/100
- Buenas prácticas: ${scores.bestPractices}/100
- Tiempo hasta que aparece algo en pantalla: ${scores.fcp}
- Tiempo hasta que carga lo principal: ${scores.lcp}
- Estabilidad visual: ${scores.cls}
- Tiempo de respuesta: ${scores.tbt}
- HTTPS: ${scores.https ? 'sí' : 'no'}
- Adaptada a móvil: ${scores.mobile ? 'sí' : 'no'}
- Tiene título: ${scores.titleTag ? 'sí' : 'no'}
- Tiene meta descripción: ${scores.metaDesc ? 'sí' : 'no'}

UMBRALES DE GOOGLE (úsalos como referencia exacta):
- Carga principal (LCP): bueno < 2.5s | mejorable 2.5–4s | lento > 4s
- Estabilidad (CLS): bueno < 0.1 | mejorable 0.1–0.25 | malo > 0.25
- Primera aparición (FCP): bueno < 1.8s | mejorable 1.8–3s | lento > 3s
- Puntuación: bueno 90–100 | mejorable 50–89 | malo 0–49

INSTRUCCIONES:
1. Escribe en español, tuteo (tú), tono cercano y directo. Nada de jerga técnica.
2. Traduce los datos a consecuencias reales: no digas "LCP 10.3s", di "tu web tarda 10 segundos en cargar — según Google, lo ideal es menos de 2.5s".
3. SOLO usa los datos medidos. Nunca inventes cifras ni porcentajes.
4. Estructura exacta (respeta este orden):

**Lo que está funcionando bien** (máx. 2 puntos — solo si hay datos buenos reales)
- Lista breve con ✅

**Lo que necesita mejorar** (los 3 problemas más importantes por impacto)
- Para cada uno: qué está mal, qué significa para el restaurante, cómo se arregla en términos simples

**Lo que podemos hacer juntos**
- 2-3 frases en primera persona del plural (nosotros = Visuanza + el cliente): qué se puede mejorar y qué resultado se esperaría. No prometas resultados concretos que no puedas garantizar.

5. Termina con: "**En resumen:** [1 frase honesta sobre el estado actual de la web]"
6. Máximo 300 palabras. Sin tecnicismos. Sin mencionar Lighthouse ni Google Lighthouse.`;

  const message = await claude.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages:   [{ role: 'user', content: prompt }],
  });

  return message.content[0].text;
}

// ── Branded HTML email (Spanish) ──────────────────────────────────────────────
function scoreColor(n) {
  if (n >= 90) return '#22c55e';
  if (n >= 50) return '#f59e0b';
  return '#ef4444';
}

function scoreLabel(n) {
  if (n >= 90) return 'Bueno';
  if (n >= 50) return 'Mejorable';
  return 'Deficiente';
}

function check(val) {
  return val ? '✅' : '❌';
}

function narrativeToHTML(text) {
  return text
    .split('\n')
    .filter(l => l.trim())
    .filter(l => !/^#\s+/.test(l))
    .map(line => {
      line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      if (/^###\s+/.test(line))
        return `<p style="margin:16px 0 6px;font-size:14px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.08em;">${line.replace(/^###\s+/, '')}</p>`;
      if (/^##\s+/.test(line))
        return `<p style="margin:20px 0 8px;font-size:17px;font-weight:700;color:#111827;">${line.replace(/^##\s+/, '')}</p>`;
      if (/^#\s+/.test(line))
        return `<p style="margin:0 0 16px;font-size:19px;font-weight:800;color:#111827;">${line.replace(/^#\s+/, '')}</p>`;
      if (/^---$/.test(line.trim())) return '';
      return `<p style="margin:0 0 12px;font-size:17px;color:#374151;line-height:1.75;">${line}</p>`;
    })
    .join('');
}

function buildEmailHTML(name, url, s, narrative) {
  // Extract resumen line from narrative to show at top
  const resumenMatch = narrative.match(/\*\*En resumen:\*\*(.+)/i);
  const resumen = resumenMatch ? resumenMatch[1].trim() : null;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0f2;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f2;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:36px 40px 28px;text-align:center;">
    <div style="font-size:30px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Visuanza</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase;">Marketing Digital para Restaurantes</div>
    <div style="margin-top:20px;font-size:20px;font-weight:600;color:#ffffff;">Análisis de tu web</div>
    <div style="margin-top:6px;font-size:14px;color:rgba(255,255,255,0.6);">${url}</div>
  </td></tr>

  <!-- Greeting -->
  <tr><td style="padding:32px 40px 0;">
    <p style="margin:0;font-size:18px;color:#1f2937;line-height:1.7;">
      Hola <strong>${name}</strong>,<br><br>
      Aquí tienes el análisis de tu web. Te explicamos qué está bien, qué se puede mejorar y cómo podemos ayudarte.
    </p>
  </td></tr>

  ${resumen ? `
  <!-- Resumen destacado -->
  <tr><td style="padding:24px 40px 0;">
    <div style="background:#fafafa;border-left:4px solid #4F7EFF;border-radius:0 12px 12px 0;padding:18px 20px;">
      <div style="font-size:13px;font-weight:700;color:#4F7EFF;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">En resumen</div>
      <p style="margin:0;font-size:18px;color:#1f2937;line-height:1.6;">${resumen}</p>
    </div>
  </td></tr>` : ''}

  <!-- Score cards -->
  <tr><td style="padding:24px 40px 0;">
    <div style="font-size:14px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px;">Puntuaciones</div>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        ${[
          ['Posicionamiento', s.seo],
          ['Velocidad', s.performance],
          ['Accesibilidad', s.accessibility],
          ['Buenas prácticas', s.bestPractices],
        ].map(([label, score]) => `
        <td align="center" style="padding:0 4px;">
          <div style="background:#fafafa;border:2px solid ${scoreColor(score)};border-radius:12px;padding:16px 6px;">
            <div style="font-size:28px;font-weight:800;color:${scoreColor(score)};">${score}</div>
            <div style="font-size:13px;color:#374151;margin-top:4px;line-height:1.3;">${label}</div>
            <div style="font-size:13px;font-weight:700;color:${scoreColor(score)};margin-top:3px;">${scoreLabel(score)}</div>
          </div>
        </td>`).join('')}
      </tr>
    </table>
    <p style="margin:10px 0 0;font-size:14px;color:#6b7280;text-align:center;">
      0–49 Malo &nbsp;·&nbsp; 50–89 Mejorable &nbsp;·&nbsp; 90–100 Bueno
    </p>
  </td></tr>

  <!-- Speed summary -->
  <tr><td style="padding:20px 40px 0;">
    <div style="background:#fafafa;border-radius:12px;padding:20px 24px;">
      <div style="font-size:14px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px;">Velocidad de carga</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ['Primer contenido visible', s.fcp, '< 1.8s es bueno'],
          ['Contenido principal cargado', s.lcp, '< 2.5s es bueno'],
          ['Estabilidad de la página', s.cls, '< 0.1 es bueno'],
          ['Tiempo de respuesta', s.tbt, '< 200ms es bueno'],
        ].map(([label, val, ref]) => `
        <tr>
          <td style="padding:7px 0;font-size:17px;color:#374151;">
            ${label}<br>
            <span style="font-size:13px;color:#6b7280;">${ref}</span>
          </td>
          <td align="right" style="font-size:16px;font-weight:700;color:#111827;white-space:nowrap;">${val}</td>
        </tr>`).join('')}
      </table>
    </div>
  </td></tr>

  <!-- Checklist -->
  <tr><td style="padding:16px 40px 0;">
    <div style="background:#fafafa;border-radius:12px;padding:20px 24px;">
      <div style="font-size:14px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px;">Aspectos básicos</div>
      ${[
        [s.https,    'Tu web usa conexión segura (https)'],
        [s.mobile,   'Tu web se ve bien en móvil'],
        [s.titleTag, 'Tiene título en Google'],
        [s.metaDesc, 'Tiene descripción en Google'],
      ].map(([val, label]) => `
      <div style="padding:5px 0;font-size:17px;color:#374151;">${check(val)} ${label}</div>`).join('')}
    </div>
  </td></tr>

  <!-- Claude Analysis -->
  <tr><td style="padding:20px 40px 0;">
    <div style="font-size:14px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px;">Análisis completo</div>
    ${narrativeToHTML(narrative)}
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:28px 40px 40px;text-align:center;background:#fafafa;margin-top:24px;">
    <p style="font-size:18px;color:#1f2937;line-height:1.6;margin:0 0 8px;font-weight:600;">
      ¿Quieres que lo arreglemos juntos?
    </p>
    <p style="font-size:16px;color:#374151;line-height:1.6;margin:0 0 24px;">
      En Visuanza nos especializamos en webs para restaurantes. Hablamos sin compromiso.
    </p>
    <a href="https://visuanza.es/contacto.html"
       style="display:inline-block;background:linear-gradient(135deg,#4F7EFF,#3a6be8);color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 36px;border-radius:999px;">
      Hablar con Visuanza →
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
    <div style="font-size:13px;color:#6b7280;line-height:1.7;">
      © 2026 Visuanza<br>
      Has recibido este correo porque pediste un análisis gratuito en visuanza.es.<br>
      Los datos reflejan el estado de tu web en el momento del análisis.
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

app.listen(PORT, () => console.log(`Visuanza SEO Analyzer listening on port ${PORT}`));
