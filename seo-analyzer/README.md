# Visuanza SEO Analyzer

Free SEO analysis tool running on Z17. Prospect enters their URL + email on
the Visuanza hero → Z17 runs Google Lighthouse → sends a branded PDF report
to their inbox. Ivan gets BCC on every report.

## Architecture

```
Visuanza hero form
  → POST https://seo.visuanza.es/analyze { url, email, name }
    → Cloudflare Tunnel
      → Z17 Express server (port 4000)
        → Lighthouse CLI (headless Chromium)
          → Branded HTML email via Brevo SMTP
            → Prospect inbox + Ivan BCC
```

## Cost

| Component       | Cost     |
|-----------------|----------|
| Z17 server      | €0 (already running) |
| Lighthouse CLI  | €0 (open source) |
| Cloudflare Tunnel | €0 (free plan) |
| Brevo SMTP      | €0 (300 emails/day free) |
| **Total**       | **€0/month** |

## Setup (run once on Z17)

```bash
# Copy project to Z17
scp -r seo-analyzer/ z17:~/visuanza-seo/

# SSH into Z17
ssh z17

# Run setup script
cd ~/visuanza-seo
bash setup-z17.sh

# Add Brevo credentials
nano .env
sudo systemctl restart visuanza-seo
```

## Cloudflare Tunnel Setup

1. Create free account at https://cloudflare.com
2. Add your domain (visuanza.es) to Cloudflare
3. On Z17:
```bash
# Install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Authenticate (opens browser link — paste on your laptop)
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create visuanza-seo

# Route traffic: seo.visuanza.es → localhost:4000
cloudflared tunnel route dns visuanza-seo seo.visuanza.es

# Run as systemd service
cloudflared service install
```

After this, `https://seo.visuanza.es/analyze` is publicly accessible.

## Brevo SMTP Setup

1. Create free account at https://app.brevo.com
2. Go to Settings → SMTP & API → SMTP
3. Copy login email + SMTP key into `.env`

## API

### POST /analyze

**Request:**
```json
{
  "url": "https://restaurante.es",
  "email": "owner@restaurante.es",
  "name": "Restaurante El Buen Sabor"
}
```

**Response (immediate):**
```json
{
  "message": "Análisis en curso. Recibirás el informe en tu correo en unos minutos."
}
```

Report is generated async (~60–90s) and emailed automatically.

### GET /

Health check — returns `{ status: "Visuanza SEO Analyzer online" }`.

## Report contents

- **4 score cards**: SEO · Rendimiento · Accesibilidad · Buenas Prácticas (0–100)
- **Core Web Vitals**: FCP, LCP, CLS, TBT with actual measured values
- **SEO checklist**: HTTPS, mobile viewport, title tag, meta description
- **CTA**: links back to visuanza.es/contacto.html

## Monitoring

```bash
# Live logs
sudo journalctl -u visuanza-seo -f

# Restart
sudo systemctl restart visuanza-seo

# Status
sudo systemctl status visuanza-seo
```

## UFW (already configured on Z17)

The Express server only listens on localhost — Cloudflare Tunnel handles
external access. No UFW changes needed.
