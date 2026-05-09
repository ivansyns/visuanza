# Visuanza Brand Guidelines — v6 (CIRLO direction)

Visuanza is the Spanish branch of **Syns Nu Media** (Stockholm). The visual system mirrors the Swedish v6 spec exactly so Stockholm and Madrid read as the same brand. **The source of truth is `index.html` and `assets/visuanza-chrome.css`** — this doc summarizes; the code is canonical.

## Identity

- **Agency name**: Visuanza
- **Parent company**: Syns Nu AB (Stockholm)
- **Voice**: Spanish, "vosotros" register, direct, value-led, no padding
- **Lockup**: tri-dot (peach · teal · lavender) + "VISUANZA" wordmark in the bottom big-mark; floating hash-mark + VISUANZA in the nav pill
- **Tagline**: "Marketing que de verdad llena mesas — no que cuenta likes."

## Color tokens

Defined in `:root` of `assets/visuanza-chrome.css`. Use the variables, not the literal hex.

**Editorial palette (accents, dots, buttons):**
- `--edit-peach` `#FFCFA8` · `--edit-peach-soft` `#FFE6D2` · `--edit-peach-chip` `#FF9C6B`
- `--edit-teal` `#4EBFB8`
- `--edit-lavender` `#E8E1FF` · `--edit-lavender-soft` `#F4EFFF` · `--edit-lavender-chip` `#B9A3F7`
- `--edit-olive` `#E5EE9E` · `--edit-olive-chip` `#D4EB7A`
- `--edit-cream` `#E5CDAB` · `--edit-warm` `#F5D7B8`

**Neutrals:**
- `--bg` `#FFFFFF` · `--bg-soft` `#F7F7F5` · `--bg-tint` `#F4F4F2`
- `--bg-dark` `#0A0A0B` · `--bg-dark-2` `#141416`
- `--text` `#0F0F10` · `--text-2` `#52525B` · `--text-3` `#71717A` · `--text-muted` `#A1A1AA`
- `--border` `#EAEAE6` · `--border-strong` `#D4D4D0` · `--border-dark` `rgba(255,255,255,0.08)`

The cobalt blue (`#2563EB`) of the v5 era is **deprecated**. Don't introduce new accents — combine the editorial palette tones for chips, gradients, and emphasis.

## Typography

- **Sans**: `Plus Jakarta Sans` (300–800), used for everything except italic display
- **Italic display**: `Instrument Serif` (italic), used for `.gradient-text` / `<em>` inside headlines for editorial emphasis
- **Sizes**: `--fs-display` (hero), `--fs-h1`, `--fs-h2-lg`, `--fs-h2`, `--fs-lead`. Don't hand-size headings — use the tokens.
- **Tracking**: `--tr-display` `-0.05em`, `--tr-h1` `-0.045em`, `--tr-h2` `-0.04em`. Negative tracking on headlines, normal on body.
- **Weights**: 600 for headlines, 500 for medium-emphasis UI, 400 for body, 700 for the giant footer wordmark only.

## Layout & spacing

- `--container` `min(1400px, 94vw)` for content
- `--container-wide` `min(1680px, 96vw)` for full-bleed sections
- `--gutter` `24px` horizontal padding
- `--nav-h` `76px` nav offset for `<main>` padding-top
- Section padding: `clamp(64px, 9vw, 120px)` vertical
- Grid gaps: `clamp(20px, 3vw, 40px)`
- Radii: `--r-md` `14px` (chips/inputs) · `--r-card` `18px` (cards) · `--r-xl` `28px` (hero panels) · `--r-pill` `9999px`

## Components

Defined in `assets/visuanza-chrome.css`:

- **Nav** — `#nav` floating pill, `.nav__inner`, `.nav__logo`, `.nav__links`, `.nav__has-dropdown`, `.nav__dropdown`, `.nav__cta`, `#hamburger`. Hides on scroll-down via `chrome.js`.
- **Buttons** — `.btn` `.btn--blue` `.btn--ghost` `.btn--sm`. Pill-style: `.pill-btn` `.pill-btn--dark` `.pill-btn--lav` with `.pill-btn__arrow` circle arrow.
- **Tri-dot mark** — `.tri-dot` with three `<b>` children. Sized in `em` so it scales with the parent font.
- **Signature stamp** — `.sec-signature` dark panel with centered hash mark and "SYNS NU MEDIA · MADRID" eyebrow. Always sits between page body and big-mark footer.
- **Big-mark footer** — `.sec-footer-big`, 5-col grid (`.footer-big__grid`), giant `.footer-big__mark` lockup with tri-dot + VISUANZA, bottom strip with copyright.
- **Reveal utility** — `.fx-up` (+ `--d1` `--d2` `--d3` delays). Triggered by `chrome.js` IntersectionObserver.

## Tone of voice

- Spanish, "vosotros" register (mirrors the existing index copy)
- Direct, no jargon, no filler
- Lead with value (reservas, comensales, caja del día) — not vanity (likes, alcance)
- Editorial italics for emphasis on key nouns: `<em class="gradient-text">restaurante</em>`, `<em>mesas</em>`, etc.
- No salesy language — "Reservad una llamada", not "¡No te pierdas esta oportunidad!"

## Where things live

- **Pages**: 13 HTML files at the project root (index, servicios, redes-sociales, diseno-web, fotografia-menu, google-publicidad, publicidad-digital, contacto, blog, casos, nosotros, analisis, politica-privacidad)
- **Shared chrome**: `assets/visuanza-chrome.css` + `assets/visuanza-chrome.js`
- **Hash mark assets**: `assets/hash-mark.png` (dark on light) · `assets/hash-mark-white.png` (light on dark)
- **Page-specific media**: `assets/insights/`, `assets/accel/`, etc.

## Updating the brand

If you change a token in `assets/visuanza-chrome.css`, every page picks it up. If you change `index.html`'s inline `<style>` tokens, only index changes — make sure to mirror to chrome.css when the change is brand-wide.

## Reference

- Swedish source: <https://syns-nu-media.vercel.app/>
- This is the parent agency's live v6 site. Treat it as the visual reference for any decision not documented here.
