# Design System — Visuanza

## Personality
Premium, warm, confident restaurant marketing agency. Dark bookends (hero/footer) with warm cream content sections. Copper accent throughout.

## Colors
| Token        | Value                   | Usage                    |
|--------------|-------------------------|--------------------------|
| --blue       | #C08B5C                 | Primary accent (copper)  |
| --blue-dark  | #A67744                 | Hover states             |
| --black      | #1A1A1A                 | Hero/footer background   |
| --dark       | #141414                 | Deep dark background     |
| --gray-dark  | #1E1E1E                 | Dark section alt          |
| --gray-mid   | #6B5E54                 | Muted text (warm)        |
| --gray-light | #F0EBE3                 | Alt section background   |
| --white      | #FAF7F2                 | Page background (cream)  |
| --text       | #1A1A1A                 | Body text                |
| --text-muted | #6B5E54                 | Secondary text           |
| --border     | rgba(107,94,84,0.12)    | Borders, dividers        |
| --surface    | #F0EBE3                 | Cards, alt sections      |

## Typography
| Element | Font           | Size                          | Weight | Line-height |
|---------|----------------|-------------------------------|--------|-------------|
| h1      | Libre Bodoni   | clamp(2.8rem, 4.5vw, 4rem)   | 700    | 1.1         |
| h2      | Libre Bodoni   | clamp(2.2rem, 3.5vw, 3.6rem) | 700    | 1.15        |
| h3      | Libre Bodoni   | 1.05rem                       | 700    | —           |
| body    | DM Sans        | 18px                          | 400    | 1.6         |
| small   | DM Sans        | 0.78rem                       | 600    | —           |
| nav     | DM Sans        | 0.85rem                       | 500    | —           |
| button  | DM Sans        | 0.85rem                       | 600    | —           |

## Spacing Scale
8px · 12px · 14px · 16px · 20px · 24px · 28px · 32px · 36px · 48px · 64px · 80px · 110px · 130px · 140px

## Border Radius
| Element  | Radius |
|----------|--------|
| Buttons  | 3px    |
| Cards    | 4px (--radius-lg) |
| Inputs   | 3px (--radius) |
| Images   | 3-4px  |
| Nav pill | 999px  |
| Badges   | 3px    |

## Shadows
| Level    | Value                                                        |
|----------|--------------------------------------------------------------|
| subtle   | 0 2px 12px rgba(0,0,0,0.05)                                 |
| card     | 0 4px 24px rgba(0,0,0,0.08)                                 |
| elevated | 0 12px 32px rgba(0,0,0,0.08)                                |
| button   | 0 4px 20px rgba(192,139,92,0.35)                             |

## Buttons
| Style     | Background  | Text      | Border                          | Radius | Padding       |
|-----------|-------------|-----------|----------------------------------|--------|---------------|
| Primary   | #C08B5C     | #FAF7F2   | none                             | 3px    | 10px 20px     |
| Ghost     | transparent | #C08B5C   | 1px solid rgba(192,139,92,0.3)   | 3px    | 14px 28px     |
| Submit    | #C08B5C     | #ffffff   | none                             | 3px    | 0.9rem 2.5rem |

## Nav
- Fixed position, transparent wrapper, inner pill floats centered
- Nav pill: max-width: 1120px, border-radius: 999px
- Background: rgba(255,255,255,0.88) padding-box + gradient border
- backdrop-filter: blur(18px)
- Links: color: #1A1A1A, hover: color: var(--blue) copper

## Footer
- Background: #1A1A1A (dark charcoal)
- 4-column grid: brand+CTA / servicios / navegar / redes
- Column headers: rgba(255,255,255,0.9), uppercase
- Links: rgba(255,255,255,0.6), underline
- Footer CTA: copper pill linking to analisis.html
- Social icons: 36px rounded squares

## Accessibility
- Focus-visible: outline: 2px solid var(--blue), outline-offset: 3px
- prefers-reduced-motion: reduce disables all transitions/animations
- Cards: cursor: pointer
- Footer links: underline with text-underline-offset: 3px
- All images have descriptive Spanish alt text
- <main> landmark on all pages

## Notes
- Grain noise overlay on body::after at 0.028 opacity
- Subtle copper radial glow on hero
- Card hover: translateY(-4px) + copper border glow
- Alternating section backgrounds: #FAF7F2 / #F0EBE3
- Social proof: JS conveyor belt arc on desktop, JS blur-focus strip on mobile
- Visuanza hub circle: copper #C08B5C (was blue #2e27b8)
- Mobile font-size drops to 16px at ≤768px
- All content in Spanish
- Logo file: assets/SynsLogo.png
