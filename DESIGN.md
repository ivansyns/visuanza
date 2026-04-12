# Design System — Visuanza

## Personality
Clean, professional light theme with cobalt blue accents — modern SaaS agency feel for restaurant marketing.

## Colors
| Token        | Value                   | Usage                    |
|--------------|-------------------------|--------------------------|
| --blue       | #4F7EFF                 | Buttons, links, accents  |
| --blue-dark  | #3a6be8                 | Hover states, highlights |
| --bg         | #ffffff                 | Page background          |
| --surface    | #f8fafc                 | Cards, alt sections      |
| --text       | #0f172a                 | Body text                |
| --text-muted | #4b5563                 | Secondary text           |
| --border     | rgba(0,0,0,0.08)        | Borders, dividers        |
| --gray-mid   | #64748b                 | Tertiary text            |
| --gray-light | #f1f5f9                 | Light backgrounds        |
| footer-bg    | #0f172a                 | Footer background        |

## Typography
| Element | Font      | Size                          | Weight | Line-height |
|---------|-----------|-------------------------------|--------|-------------|
| h1      | Urbanist  | clamp(2.8rem, 4.5vw, 4rem)   | 900    | 1.1         |
| h2      | Urbanist  | clamp(2.2rem, 3.5vw, 3.6rem) | 900    | 1.15        |
| h3      | Urbanist  | 1.05rem                       | 700    | —           |
| body    | DM Sans   | 18px                          | 400    | 1.6         |
| small   | DM Sans   | 0.78rem                       | 600    | —           |
| nav     | DM Sans   | 0.85rem                       | 500    | —           |
| button  | DM Sans   | 0.85rem                       | 600    | —           |

- Headings: `letter-spacing: -0.04em` (h1), `-0.03em` (h2), `-0.02em` (h3)
- Section labels: `letter-spacing: 0.18em`, `text-transform: uppercase`
- Card body text override: `#374151` for service-card p, bento-content p

## Spacing Scale
8px · 12px · 14px · 16px · 20px · 24px · 28px · 32px · 36px · 48px · 64px · 80px · 110px · 130px · 140px

## Border Radius
| Element  | Radius |
|----------|--------|
| Buttons  | 8px    |
| Cards    | 20px (--radius-lg) |
| Inputs   | 12px (--radius) |
| Images   | 16–24px |
| Nav pill | 999px  |
| Badges   | 100px  |

## Shadows
| Level    | Value                                                        |
|----------|--------------------------------------------------------------|
| subtle   | 0 2px 12px rgba(0,0,0,0.05)                                 |
| card     | 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)    |
| elevated | 0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(79,126,255,0.15) |
| button   | 0 4px 20px rgba(79,126,255,0.35)                             |
| nav      | 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)    |

## Buttons
| Style     | Background  | Text    | Border                          | Radius | Padding       |
|-----------|-------------|---------|----------------------------------|--------|---------------|
| Primary   | #4F7EFF     | #ffffff | none                             | 8px    | 10px 20px     |
| Blue      | #4F7EFF     | #ffffff | none                             | 8px    | 12px 24px     |
| White     | #ffffff     | #0f172a | 1px solid rgba(0,0,0,0.10)      | 8px    | 14px 32px     |
| Submit    | #4F7EFF     | #ffffff | none                             | 999px  | 0.9rem 2.5rem |

## Nav
- Fixed position, transparent wrapper, inner pill floats centered
- Nav pill: `max-width: 1120px`, `border-radius: 999px`
- Background: `rgba(255,255,255,0.88) padding-box` + gradient border trick (`linear-gradient border-box`)
- `backdrop-filter: blur(18px)`
- Shadow: `0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)`
- Links: `color: #0f172a`, hover: `color: var(--blue)`, `background: rgba(79,126,255,0.06)`
- Dropdown: white glass `rgba(255,255,255,0.97)`, 16px radius, blue accent on hover
- Hamburger at ≤768px, white full-screen mobile menu

## Footer
- Background: `#0f172a` (dark)
- 4-column grid: brand+CTA / servicios / navegar / redes
- Column headers: `rgba(255,255,255,0.9)`, uppercase, 0.78rem
- Links: `rgba(255,255,255,0.6)` with underline, hover to 0.9
- Footer logo: white invert filter, 72px height
- Social icons: 36px rounded squares
- Footer CTA button: blue pill linking to analisis.html

## Accessibility
- Focus-visible: `outline: 2px solid var(--blue)`, `outline-offset: 3px`
- `prefers-reduced-motion: reduce` disables all transitions/animations
- Cards (step, service, testimonial, bento): `cursor: pointer`
- Footer links: underline with `text-underline-offset: 3px`
- All images have descriptive Spanish alt text
- `<main>` landmark on all pages

## Notes
- Grain noise overlay on body::after at 0.028 opacity
- Subtle blue radial glow on hero (`rgba(79,126,255,0.08)`)
- Card hover: translateY(-4px) + blue border glow
- Alternating section backgrounds: #ffffff / #f8fafc
- Social proof: JS conveyor belt arc on desktop, JS blur-focus strip on mobile
- Mobile font-size drops to 16px at ≤768px
- All content in Spanish
- Logo file: assets/SynsLogo.png
