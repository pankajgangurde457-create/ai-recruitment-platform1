---
name: Premium AI Recruitment Interface
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393f'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#282a2f'
  surface-container-highest: '#33353a'
  on-surface: '#e2e2e9'
  on-surface-variant: '#c3c5d7'
  inverse-surface: '#e2e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#8d90a0'
  outline-variant: '#434654'
  surface-tint: '#b5c4ff'
  primary: '#b5c4ff'
  on-primary: '#00297b'
  primary-container: '#648aff'
  on-primary-container: '#00236d'
  inverse-primary: '#1a53d6'
  secondary: '#cabeff'
  on-secondary: '#31009a'
  secondary-container: '#4816cb'
  on-secondary-container: '#b9aaff'
  tertiary: '#4cd6ff'
  on-tertiary: '#003543'
  tertiary-container: '#009dc1'
  on-tertiary-container: '#002e3a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b5c4ff'
  on-primary-fixed: '#00164d'
  on-primary-fixed-variant: '#003cad'
  secondary-fixed: '#e6deff'
  secondary-fixed-dim: '#cabeff'
  on-secondary-fixed: '#1c0062'
  on-secondary-fixed-variant: '#4816cb'
  tertiary-fixed: '#b7eaff'
  tertiary-fixed-dim: '#4cd6ff'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#111318'
  on-background: '#e2e2e9'
  surface-variant: '#33353a'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  mono-technical:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '450'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style

The design system is engineered for a high-performance AI recruitment environment, blending the precision of developer tools with the elegance of premium consumer hardware interfaces. The brand personality is **intelligent, elite, and frictionless**, designed to evoke a sense of professional mastery and effortless scale.

The visual style is a hybrid of **High-End Glassmorphism** and **Technical Minimalism**. It utilizes deep obsidian surfaces layered with translucent panes to create a sense of infinite digital space. Depth is not merely decorative but functional, using light transmission and subtle tactile elevations to guide the recruiter's focus toward high-priority AI insights. The emotional response is one of calm authority—reducing the "noise" of traditional HR software into a refined, data-rich experience.

## Colors

The palette is rooted in a "Deep Space" theme to minimize eye strain during long screening sessions while allowing accent colors to vibrate with purpose. 

- **Primary Background (#0B0D12):** The foundation. Pure, matte obsidian.
- **Secondary Panels (#12161F):** Used for elevated cards and sidebars to create structural hierarchy.
- **Electric Blue (#4F7CFF):** The "Action" color. Reserved for primary calls-to-action, active states, and AI-verified candidates.
- **Vivid Purple (#7C5CFF):** The "AI Intelligence" color. Used for automated workflows, predictive scoring, and generative features.
- **Functional Neutrals:** Greyscale values follow a strict luminosity scale to ensure high-contrast legibility against dark backgrounds.

## Typography

This design system utilizes **Inter** for its incredible legibility and "tech-standard" feel, paired with **Geist** for technical labels and data points to provide a refined, developer-tool aesthetic.

Hierarchy is achieved through aggressive weight variance and tight letter-spacing on larger headings to mimic high-end editorial layouts. All large displays use negative letter-spacing (`-0.04em`) to maintain a "tight" professional appearance. Body text remains generous in line-height (1.5x) to ensure resume skimming is effortless. Label styles use the monospaced-leaning Geist font to differentiate "System Data" from "Human Content."

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid**. Main dashboards are constrained to a 1440px max-width to prevent information density fatigue on ultra-wide monitors, centering the recruitment pipeline.

A strict **8px linear scale** governs all spacing. However, this system emphasizes "Breathing Whitespace"—utilizing larger `stack-xl` (64px) gaps between major sections to mimic the airy feel of the Apple and Stripe ecosystems. 

**Breakpoints:**
- **Desktop (1280px+):** 12-column grid, 48px outer margins.
- **Tablet (768px - 1279px):** 8-column grid, 32px outer margins.
- **Mobile (Up to 767px):** 4-column grid, 16px outer margins, stack-based reflow.

## Elevation & Depth

Depth is the core differentiator of this design system. It utilizes three distinct layers of elevation:

1.  **Floor (0dp):** The `#0B0D12` background. Matte, non-interactive.
2.  **Glass Panes (10dp):** Semi-transparent surfaces (`rgba(18, 22, 31, 0.8)`) with a `20px` backdrop-blur. These feature a 1px inner border (`rgba(255, 255, 255, 0.08)`) to catch the light, creating a "milled glass" effect.
3.  **Floating AI Widgets (20dp):** These elements use a subtle "Glow" shadow—a drop shadow with a spread of `10px` and a color-matched tint (e.g., a 10% opacity blue glow for primary widgets).

**Neumorphic Subtle Depth:** For secondary buttons and toggle tracks, a very soft inner-shadow and outer-bevel technique is used to create a "pressed-in" or "extruded" feel, but it is kept monochromatic to avoid the cluttered look of early neumorphism.

## Shapes

The design system adopts a **Modern-Organic** shape language. 

Standard components (Cards, Inputs) use a **20px corner radius** (defined as `rounded-lg`). This high radius softens the technical nature of the AI data and aligns with the hardware aesthetics of modern mobile OS.
- **Small components (Chips/Badges):** 8px radius.
- **Main Containers:** 24px radius.
- **Buttons:** Fully pill-shaped or 12px depending on the context of the magnetic interaction.

## Components

### Magnetic Buttons
Primary buttons feature a "magnetic" hover effect where the hit area is larger than the visual button. They utilize a **Linear-style gradient border** (Electric Blue to Purple) and a subtle shimmer animation that tracks with the mouse cursor position.

### Glass Inputs
Fields are transparent with a `1px` stroke. Upon focus, the label floats upward and the stroke transforms into a 2px Electric Blue glow. The background of the input slightly increases in opacity (from 5% to 10%) when active.

### Floating AI Widgets
Small, utility-based panels (e.g., "AI Candidate Summary") that float over the main content. They feature a continuous **animated gradient border** (1px thickness) that cycles slowly through the primary and secondary accents, signifying "active" AI processing.

### Interactive Charts
Data visualizations use "Vercel-style" minimalism—no axes lines, only soft-glow area fragments. On hover, a vertical scanning line follows the cursor, displaying tooltips in a glass-morphic popover.

### Shimmering Loading States
Instead of spinners, use skeleton screens with a directional "light sweep" animation (linear-gradient at 45 degrees) that moves from left to right every 1.5 seconds.