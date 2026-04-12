# Design System — Visuanza

## Personality
Premium warm restaurant marketing agency. Copper accent on cream backgrounds with dark charcoal bookends (footer). Sharp, editorial typography. Confident and minimal.

## CSS Variables (:root)
```css
--blue:       #C08B5C   /* Primary accent — copper */
--blue-dark:  #A67744   /* Hover/pressed states */
--black:      #1A1A1A   /* Dark backgrounds */
--dark:       #141414   /* Deep dark */
--gray-dark:  #1E1E1E   /* Dark section alt */
--gray-mid:   #6B5E54   /* Muted text */
--gray-light: #F0EBE3   /* Alt section bg / surface */
--white:      #FAF7F2   /* Page background (warm cream) */
--text:       #1A1A1A   /* Body text */
--text-muted: #6B5E54   /* Secondary text */
--border:     rgba(107,94,84,0.12)  /* Borders */
--surface:    #F0EBE3   /* Cards, alt sections */
--radius:     3px       /* Default radius */
--radius-lg:  4px       /* Large radius */
```

## Additional Hardcoded Colors
| Value | Usage |
|-------|-------|
| #0f172a | Nav logo text, nav links, dropdown item text, dropdown title |
| #64748b | Dropdown description text (.ndi-desc) |
| #374151 | Service card body text, bento content text |
| #ffffff | Nav dropdown bg, dropdown arrow, card hover bg, phone UI internals |
| rgba(192,139,92,*) | All accent glows, shadows, borders, hover states |
| rgba(255,255,255,*) | Footer text/links (0.45-0.9 opacity range) |
| #fbbc04 | Testimonial stars (Google gold) |
| #e2e8f0 | Bento image frame placeholder bg |
| #C08B5C | Hero word carousel color, copper accent |

## Typography
| Element | Font | Size | Weight | Line-height | Letter-spacing |
|---------|------|------|--------|-------------|----------------|
| h1 | Libre Bodoni | clamp(2.8rem, 4.5vw, 4rem) | 900 | 1.1 | -0.04em |
| h2 | Libre Bodoni | clamp(2.2rem, 3.5vw, 3.6rem) | 900 | 1.15 | -0.03em |
| h3 | Libre Bodoni | 1.05-1.15rem | 700 | — | -0.02em |
| body | DM Sans | 18px | 400 | 1.6 | — |
| hero p | DM Sans | 1.1rem | 400 | 1.7 | — |
| nav links | DM Sans | 0.85rem | 500 | — | — |
| nav logo | Libre Bodoni | 1.1rem | 800 | — | -0.02em |
| section-label | DM Sans | 0.78rem | 600 | — | 0.18em, uppercase |
| section-header h2 | Libre Bodoni | clamp(1.8rem, 3vw, 2.6rem) | 900 | 1.2 | -0.03em |
| section-header p | DM Sans | 0.95rem | 400 | — | — |
| btn-primary | DM Sans | 0.85rem | 600 | — | — |
| btn-ghost | DM Sans | 0.9rem | 600 | — | — |
| btn-blue | DM Sans | 0.9rem | 600 | — | — |
| hero-badge | DM Sans | 0.78rem | 600 | — | — |
| footer-col h4 | DM Sans | 0.78rem | 700 | — | 0.08em, uppercase |
| footer links | DM Sans | 0.82rem | 400 | — | — |
| footer-copy | DM Sans | 0.75rem | 400 | — | — |
| bento-tag | Libre Bodoni | 1.1rem | 800 | — | 0 |
| testimonial-text | DM Sans | 1rem | 400 | 1.6 | — |
| service-card h3 | Libre Bodoni | 1.15rem | 700 | — | — |
| service-card p | DM Sans | 1.05rem | 400 | 1.6 | — |

Google Fonts import: `Libre+Bodoni:wght@400;500;600;700` + `DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700`

## Section Padding
| Section | Padding |
|---------|---------|
| .hero | 130px 0 0 |
| .social-proof | padding-top: 120px |
| .platforms | 130px 0 0 |
| .how-it-works | 200px 0 80px |
| .services | 140px 0 |
| .stats-section | 130px 0 |
| .testimonials | 110px 0 |
| .cta-section | 100px 0 |
| .contact-section | 100px 24px (max-width: 720px) |
| .bento-section | 130px 24px (max-width: 1120px) |
| footer | 60px 0 30px |

Mobile (≤768px): all sections reduce to 52-80px padding.

## Container
- Max-width: 1530px
- Padding: clamp(8px, 1.5vw, 24px) horizontal
- Nav inner max-width: 1120px
- Bento max-width: 1120px
- Contact max-width: 720px

## Border Radius
| Element | Radius |
|---------|--------|
| --radius | 3px |
| --radius-lg | 4px |
| Nav pill | 999px |
| Nav link hover | 999px |
| Hero badge | 100px |
| Step number | 10px |
| Service icon | 12px |
| Dropdown items | 10px |
| Dropdown arrow | 0 (rotated square) |
| Bento cards | 20px |
| All buttons | 3px (var(--radius)) |

## Shadows
| Element | Value |
|---------|-------|
| Nav pill | 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05) |
| Nav dropdown | 0 16px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06) |
| btn-primary | 0 4px 20px rgba(192,139,92,0.35) |
| btn-primary:hover | 0 6px 24px rgba(192,139,92,0.5) |
| Service card | 0 2px 12px rgba(0,0,0,0.05) |
| Card hover | 0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(192,139,92,0.15) |
| Testimonial hover | 0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(192,139,92,0.15) |

## Buttons
| Style | Background | Text | Border | Radius | Padding | Shadow |
|-------|-----------|------|--------|--------|---------|--------|
| Primary (.btn-primary) | var(--blue) #C08B5C | var(--white) | none | 3px | 10px 20px | 0 4px 20px rgba(192,139,92,0.35) |
| Blue (.btn-blue) | var(--blue) | var(--white) | none | 3px | 12px 24px | none |
| Ghost (.btn-ghost) | transparent | var(--blue) | 1.5px solid var(--blue) | 3px | 14px 28px | none |
| Submit (.submit-btn) | var(--blue) | white | none | 3px | 0.9rem 2.5rem | none |
| Footer CTA | var(--blue) | #fff | none | 3px | 9px 18px | none |

Hover: background → var(--blue-dark) #A67744, translateY(-1px)

## Cards
| Type | Background | Border | Radius | Padding | Hover |
|------|-----------|--------|--------|---------|-------|
| .step-card | var(--surface) | 1px solid rgba(0,0,0,0.07) | 4px | 32px 28px | translateY(-4px), white bg, copper border |
| .service-card | var(--surface) | 1px solid rgba(0,0,0,0.07) | 4px | 28px 24px | translateY(-4px), white bg, copper border |
| .testimonial-card | var(--surface) | 1px solid rgba(0,0,0,0.07) | 4px | 28px | translateY(-3px), white bg, copper border |
| .bento-card | var(--surface) | 1px solid var(--border) | 20px | — | translateY(-4px), copper border |

## Nav
- Position: fixed, top: 0, z-index: 200
- Outer nav: transparent bg, padding: 14px clamp(8px, 1.5vw, 24px), pointer-events: none
- Inner pill: max-width: 1120px, border-radius: 999px, pointer-events: auto
- Background: rgba(255,255,255,0.88) padding-box + linear-gradient(120deg) border-box
- backdrop-filter: blur(18px)
- Shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)
- Logo: 30px height image + 1.1rem Libre Bodoni text
- Links: #0f172a, hover → var(--blue) + rgba(192,139,92,0.06) bg
- Dropdown: rgba(255,255,255,0.97) bg, 4px radius, blue(20px) backdrop blur
- Hamburger visible at ≤768px

## Footer
- Background: #1A1A1A
- Text color: rgba(255,255,255,0.6)
- Grid: 2fr 1fr 1fr 1fr, gap: 40px
- Logo: 72px height, filter: brightness(0) invert(1), 2.2rem text
- Column headers: rgba(255,255,255,0.9), 0.78rem, uppercase, 0.08em spacing
- Links: rgba(255,255,255,0.6), underline (offset 3px, thickness 1px, color rgba(255,255,255,0.2))
- Link hover: rgba(255,255,255,0.9), underline-color rgba(255,255,255,0.6)
- Footer CTA: copper pill button → analisis.html
- Copy: rgba(255,255,255,0.45)
- Legal links: rgba(255,255,255,0.45), underline
- Bottom border: 1px solid rgba(255,255,255,0.06)
- Social icons: 36px, radius 3px, rgba(255,255,255,0.06) bg

## Hero Debossed Logo
The rotating Visuanza logo silhouette uses an SVG `<filter id="deboss">`:
```
- feFlood #000000 at 0.35 opacity → composited into source alpha → offset dx:3 dy:3 → blur 3px (dark shadow)
- feFlood #C08B5C at 0.3 opacity → composited into source alpha → offset dx:-2 dy:-2 → blur 2px (copper highlight)
- feColorMatrix darkens source to ~15% brightness with warm tint
- feMerge: darkened source + dark shadow blur + copper highlight blur
```
Applied via: `.hero-logo-bg-img { filter: url(#deboss); opacity: 0.22; }`
Container: 580×580px, position absolute, right: -8%, rotating at 120s

## Orbit Rings
- 3 concentric circles clipped to bottom half via clip-path: inset(50% -600px 0px -600px)
- Sizes: 430px, 580px, 730px
- Style: 1.5px solid rgba(192,139,92,0.20) border, border-radius: 50%
- Centered on hero visual (phone mockup area)

## Animations & Transitions
| Animation | Duration | Easing | Details |
|-----------|----------|--------|---------|
| Scroll fade-in | 0.65s | ease | opacity 0→1, translateY(24px→0) |
| Nav link hover | 0.2s | ease | color + background |
| Card hover | 0.2s | ease | transform, box-shadow, border-color, background |
| Dropdown open | 0.2s | ease | opacity + translateY |
| btn-primary hover | 0.2s/0.1s | ease | background/transform |
| btn-ghost hover | 0.18s | ease | background, color |
| Hamburger open | 0.3s | ease | span transform + opacity |
| Mobile menu | 0.3s | ease | opacity + translateX(100%→0) |
| Logo rotate | 120s | linear | infinite, translateY(-50%) rotate(0→360deg) |
| Grain overlay | — | — | fixed, 0.028 opacity, fractalNoise SVG |

## Social Proof
- Desktop: JS conveyor belt arc (parabolic path, 14 logos, rAF animation)
  - Visuanza hub: 140×140px circle, background: #C08B5C, triple copper box-shadow
  - Logo tiles: 120×120px, border-radius: 3px, absolute positioned
  - Text: "Elegido por más de 800 restaurantes", centered at top:260px
- Mobile (≤768px): JS horizontal strip with blur-focus effect
  - Visuanza hub: 80×80px circle, background: #C08B5C
  - Logo tiles: 80×80px, 3px radius, absolute positioned
- Both pause via IntersectionObserver when offscreen

## Accessibility
- Focus-visible: outline: 2px solid var(--blue), outline-offset: 3px, radius: 4px
- prefers-reduced-motion: all transitions/animations disabled, .fade-in shown immediately
- Interactive cards: cursor: pointer (.step-card, .service-card, .testimonial-card, .bento-card)
- Footer links: underline with text-underline-offset: 3px
- All images: descriptive Spanish alt text
- `<main>` landmark wraps content between nav and footer
- Form labels associated with inputs

## Notes
- All content in Spanish (tú register)
- Logo file: assets/SynsLogo.png
- Service images: fotografia-menu-restaurante.webp, diseno-web-restaurante.webp, publicidad.webp, redes.webp
- Platform phone screenshots: facebook.webp, GoogleMaps.webp, Maps.webp, busqueda-restaurantes-cerca-de-mi.webp
- Client logos: 14 files in assets/logos/
- Form submits to formsubmit.co/ajax/ivan@synsnumedia.com
- Word carousel cycles: restaurante, bar, cafetería, tienda (3s interval)
- Bento grid: 5-column, wide=span3, narrow=span2
