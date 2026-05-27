# PivotEdge Partners — Design System

## Overview

A premium executive search and leadership advisory brand. The visual language is editorial, restrained, and confidence-inspiring — drawing from the vocabulary of high-end professional services and luxury publishing. Every design choice communicates gravitas, discretion, and precision.

---

## Colour Palette

| Token       | Hex       | Usage                                                   |
|-------------|-----------|-------------------------------------------------------- |
| `cream`     | `#F5F0E8` | Primary background — warm, off-white, never pure white  |
| `creamAlt`  | `#EDE8DE` | Section alternates — slightly darker cream              |
| `teal`      | `#0D3D4E` | Primary brand colour — dark, authoritative, deep teal   |
| `tealLight` | `#1a5570` | Secondary teal — used in gradients and image overlays   |
| `gold`      | `#B8962E` | Accent — rule lines, labels, numbers, CTAs hover fill   |
| `goldLight` | `#C9A23F` | Gold hover variant                                      |
| `white`     | `#FFFFFF` | Used inside dark teal sections only                     |
| `textDark`  | `#1A1A1A` | Reserved for high-contrast text needs                   |
| `textMid`   | `#4A5568` | Body copy on light backgrounds                          |
| `textMuted` | `#7A8694` | Captions, timestamps, meta labels                       |

**Principle:** Never use pure white or pure black as backgrounds. The cream-teal-gold triad is the entire palette. Gold is used sparingly as an accent only — never as a fill for large surfaces.

---

## Typography

### Typefaces

| Family               | Role                                      | Source            |
|----------------------|-------------------------------------------|-------------------|
| Cormorant Garamond   | Display / Headings / Pull Quotes / Numbers | Google Fonts      |
| Jost                 | UI / Body / Labels / Buttons / Nav        | Google Fonts      |

### Scale & Usage

| Element          | Font              | Size (clamp)             | Weight | Style  |
|------------------|-------------------|--------------------------|--------|--------|
| Hero H1          | Cormorant Garamond | `clamp(64px, 8vw, 108px)`| 300    | normal |
| Page H1          | Cormorant Garamond | `clamp(52px, 7vw, 88px)` | 300    | normal |
| Section H2       | Cormorant Garamond | `clamp(36px, 4vw, 52px)` | 300    | normal |
| Card H3          | Cormorant Garamond | `24–30px`                | 400    | normal |
| Pull Quote       | Cormorant Garamond | `clamp(28px, 4vw, 52px)` | 300    | italic |
| Stat Numbers     | Cormorant Garamond | `clamp(56px, 7vw, 96px)` | 600    | normal |
| Decorative BG #  | Cormorant Garamond | `200px`                  | 300    | normal |
| Body Copy        | Jost               | `14–17px`                | 300    | normal |
| Section Labels   | Jost               | `11px`                   | 400    | normal |
| Buttons          | Jost               | `11px`                   | 400    | normal |
| Nav Links        | Jost               | `12px`                   | 400    | normal |
| Captions / Meta  | Jost               | `10–12px`                | 300–400| normal |

**Principle:** Headings are always light weight (300). Only stat numbers use heavy weight (600). This creates an editorial, refined feel rather than a bold, aggressive one.

---

## Spacing System

The layout uses an 8px base unit. Common values:

| Usage                         | Value  |
|-------------------------------|--------|
| Section padding (large)       | 120px  |
| Section padding (medium)      | 100px  |
| Section padding (compact)     | 80px   |
| Stats band / marquee          | 64px   |
| Grid gap (large)              | 96px   |
| Grid gap (medium)             | 80px   |
| Card padding                  | 48–60px|
| Nav padding                   | 20px 64px |
| Max content width             | 1200px |
| Mobile nav padding            | 16px 24px |
| Footer padding                | 80px 64px 40px |

---

## Grid & Layout

- **Max width:** `1200px`, centred with `margin: 0 auto`
- **Primary grid:** `1fr 1fr` (two-column) for editorial sections
- **Card grid:** `1fr 1fr 1fr 1fr` (four-column), `1fr 1fr 1fr` (three-column)
- **Process timeline:** `repeat(6, 1fr)` for the 6-step framework
- **Domain grid:** `1fr 1fr 1fr` (three-column)
- **Gap between cards:** `2px` — creates a flush, block-print aesthetic
- **Gap between layout columns:** `80–96px` — generous whitespace

---

## Component Patterns

### Section Label
A consistent section header pattern used on every major section.
```
[32px gold rule line] [LABEL TEXT — 11px Jost, gold, 0.22em letter-spacing, uppercase]
```
Used to orient the reader before every heading. Always gold. Never bold.

### Gold Rule
- Short: `48px × 1px` gold line — used between heading and body text
- Wide: Full-width gradient line fading right — used as a divider

### Buttons
Three variants, all use a slide-fill animation on hover (content slides in from left):
- `btn-teal` — teal background, fills to gold on hover
- `btn-outline` — teal border/text, fills to teal on hover (text turns cream)
- `btn-outline-light` — cream border/text (for dark backgrounds), fills to cream on hover (text turns teal)

All buttons: `11px`, `0.15em` letter-spacing, uppercase, `14px 36px` padding. No border-radius — sharp corners throughout.

### Cards (Service / Insight)
- `1px solid rgba(13,61,78,0.06)` border
- `translateY(-4px)` on hover
- `2px` gap between cards creates a flush grid
- No box-shadow — border only

### Stat Counter
Animated counter on scroll-enter. Cormorant Garamond 600 weight for the number, gold colour. Jost 11px uppercase label below in muted cream (for dark sections).

### Pull Quote
Cormorant Garamond italic, light weight, large. Used as full-width editorial statements on teal backgrounds. Never boxed or bordered.

### Decorative Background Number
`200px` Cormorant Garamond at `4% opacity` — used as a background texture to add depth to sections.

---

## Motion & Interaction

### Scroll Reveal
All content sections use a `.reveal` class:
- Initial: `opacity: 0`, `translateY(32px)`
- Triggered: `opacity: 1`, `translateY(0)` — 0.7s ease
- Delay utilities: `.reveal-d1` through `.reveal-d4` (0.1s steps)
- Threshold: 12% in view, with a `-40px` bottom margin offset

### Custom Cursor
- Gold dot (`8px`) tracks exact mouse position
- Gold ring (`32px`, `1px border`, 50% opacity) follows with slight lag
- `cursor: none` on body — must be disabled for mobile
- Transitions: dot `0.15s ease`, ring `0.08s ease`

### Nav Scroll Behaviour
After 60px scroll:
- Padding reduces from `20px 64px` to `14px 64px`
- Background gains `backdrop-filter: blur(12px)` + slight box-shadow
- Transition: `0.4s ease`

### Hover Interactions
- **Nav links:** gold underline slides in from left (`::after` pseudo-element)
- **Footer links:** colour transitions to gold
- **Domain list rows:** name colour transitions to gold, sub-label fades in, thumbnail image slides in from right
- **Function/services hover list:** description text slides in from right (`translateX(20px)` → 0), opacity 0 → 1
- **Images inside cards:** `scale(1.05–1.07)` on hover with `0.6–0.7s ease`

### Marquee
Infinite horizontal scroll of industry names. `28s linear` animation. Two copies of the array for seamless looping.

---

## Hero Backgrounds

All hero sections use Unsplash photographs with directional teal gradient overlays:

| Page       | Overlay Direction | Opacity Range     |
|------------|-------------------|-------------------|
| Home       | Left → right      | 0.75 → 0 (at 60%) |
| About      | Left → right      | 0.80 → 0 (at 70%) |
| Services   | Left → right      | 0.85 → 0 (at 60%) |
| Domains    | Left → right      | 0.85 → 0 (at 60%) |
| Insights   | Left → right      | 0.85 → 0 (at 60%) |
| Contact    | Top → bottom      | 0.70 → 0.50       |

The gradient always starts with strong teal (text side) and fades toward the image. This keeps text legible while the photo is visible on the right.

---

## Image Treatment

### `.img-block`
A teal gradient placeholder that renders even before the photo loads:
```css
background: linear-gradient(135deg, #0D3D4E 0%, #1a5a70 50%, #0a2e3a 100%);
```
With a subtle SVG fractal noise texture overlay at `30% opacity` for depth.

All `<img>` tags within use `object-fit: cover`, `display: block`, and slight opacity reduction (`0.7–0.9`) to integrate with the teal palette.

---

## Dark Section Pattern

The teal background (`#0D3D4E`) sections follow a consistent internal pattern:
- Dot-grid texture: `radial-gradient` at `2px × 2px` intervals, `4% opacity white`
- Text: `rgba(245,240,232,0.75)` for body, full cream for headings
- Gold accent: `rgba(184,150,46,0.4)` for rules and dividers (reduced opacity)
- `SectionLabel` uses `rgba(184,150,46,0.8)` on dark backgrounds (via `light` prop)

---

## Scrollbar

Custom styled to match the brand:
- Track: `cream`
- Thumb: `gold`
- Width: `4px`

---

## Responsive Breakpoints

| Breakpoint | Change                                   |
|------------|------------------------------------------|
| `≤ 768px`  | Nav links hidden, padding reduced to 24px |
| Mobile     | Custom cursor should be disabled         |

*Note: Full mobile layout (stacking grids, fluid type) uses `clamp()` for type but grid columns are not yet broken to single-column on mobile. This is a planned enhancement.*

---

## Forms & Inputs

All form elements share a consistent style:
- Background: `rgba(245,240,232,0.5)` — semi-transparent cream
- Border: `1px solid rgba(13,61,78,0.2)` → `var(--gold)` on focus
- Padding: `14px 18px`
- Font: Jost 14px, teal colour
- Labels: Jost 10px, 0.15em spacing, gold, uppercase

On dark (teal) backgrounds (e.g. newsletter), inputs use:
- Background: `rgba(245,240,232,0.1)`
- Border: `rgba(245,240,232,0.2)`
- Text colour: white/cream

---

## CSS Variables

Defined on `:root` and used throughout for theming consistency:

```css
--cream:      #F5F0E8
--cream-alt:  #EDE8DE
--teal:       #0D3D4E
--teal-light: #1a5570
--gold:       #B8962E
--white:      #FFFFFF
```

---

## Design Principles

1. **Sharp corners everywhere** — no border-radius on buttons, cards, or inputs. Precision over softness.
2. **Light type weight as default** — 300 for nearly all text. Weight is used for emphasis only on stat numbers.
3. **Generous whitespace** — sections breathe. Never crowd content.
4. **Gold is punctuation, not paint** — used for rules, labels, hover states, accents. Never as a dominant fill.
5. **Teal backgrounds alternate with cream** — dark-light-dark rhythm creates visual pacing.
6. **No shadows except nav scroll** — depth is created through layering and contrast, not drop shadows.
7. **Editorial grid** — `2px` gaps between cards create a newspaper/magazine feel rather than a soft SaaS aesthetic.
8. **Photography is contextual, not decorative** — images are masked, dimmed, and integrated into the teal palette.
