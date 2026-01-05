# DESIGN SYSTEM

**File:** `docs/DESIGN_SYSTEM.md`  
**Purpose:** Typography, color palette, spacing, and design principles for the project

---

## Design System

**The Marble Does Not Yield**

A literary narrative experience with intentionally restrained design.

---

## Design Philosophy

Typography is intentionally restrained. Contrast is achieved through rhythm, spacing, and hierarchy rather than multiple font families. The system stays neutral so the story can provide the emotion.

---

## Typography

### Font Families

**Fraunces** (Display)

- Variable: `--font-display`
- Weights: 400, 600, 700
- Source: Google Fonts

**Source Serif 4** (Body)

- Variable: `--font-body`
- Weights: 400, 500, 600
- Source: Google Fonts

### Usage Rules

**Fraunces (Display) — Use Only For:**

- H1 (hero title)
- Section headings (h2, h3)
- Byline / authorial moments
- Small caps / section labels

**Never use for:**

- Paragraphs
- Inline emphasis
- Long blocks of text

**Source Serif 4 (Body) — Use For:**

- All prose
- Italics
- Quotes
- Interior voice
- Reading text

This separation keeps the display font special and the reading experience consistent.

### Scale

**Hero Title:**

```css
font-size: clamp(2.5rem, 8vw, 5rem);
```

**Body Text:**

- Base: 18px → 20px (stepped, responsive)
- Line height: 1.75–1.8
- Max width: 72ch

**Headings:**

- H2: 3xl → 4xl
- H3: 2xl → 3xl

### Reading Constraints

- **Max width:** 72ch (optimal reading length)
- **Line height:** Relaxed to loose (1.75–1.8)
- **Spacing:** Generous vertical rhythm

---

## Color Palette

```css
--void: #0d0d0d        /* Near-black background */
--parchment: #e8e6e1   /* Warm off-white text */
--ash: #6b6b6b         /* Muted accents, italics */
```

### Color Usage

**Void (`#0d0d0d`)**

- Background
- Recedes, creates depth
- Never for text

**Parchment (`#e8e6e1`)**

- Primary text color
- Carries the narrative voice
- High contrast against void (WCAG AAA)

**Ash (`#6b6b6b`)**

- Italics, interior voice
- Subtle accents
- Supports, never competes

### Color Principles

- Intentionally limited palette
- No expressive branding colors
- Contextual colors only (error, focus states)
- Story provides emotion, system stays neutral

---

## Spacing & Rhythm

### Vertical Spacing

**Section spacing:**

```css
clamp(4rem, 12vh, 8rem)
```

**Paragraph spacing:**

- Normal: 1.5rem → 2rem
- Final paragraph: 0.75rem (before ending image)

**Image spacing:**

- Ending image top: -1rem (negative margin for attachment)
- Ending image bottom: 5rem (breathing room)

### Horizontal Constraints

- Content max-width: 72ch
- Hero padding: 1.5rem → 2rem
- Prose padding: 1.5rem → 2rem

---

## Animation Philosophy

### Principles

- Hero establishes tone
- Text fades quietly as reader progresses
- Ending image constrained to reading width
- All motion disabled when `prefers-reduced-motion` is enabled

### Timing

**Hero Sequence:**

1. Image smashes down (1.4s)
2. Title fades in (0.7s, delay 2.5s)
3. Byline fades in (0.6s, delay 3.0s)
4. Description fades in (0.6s, delay 3.3s)
5. Scroll indicator (0.5s, delay 3.5s)

**Scroll Animations:**

- Text fade-in: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)
- Image fade-in: 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)

### Motion Settings

```typescript
scrollFade: {
  duration: 1200, // ms
  easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
}
```

---

## Accessibility

### Standards

- **Semantic HTML** throughout
- **WCAG AAA** contrast ratios
- **Keyboard-visible** focus states
- **Motion-respecting** animations
- **Decorative images** use empty alt text per WCAG guidance

### Reduced Motion

When `prefers-reduced-motion: reduce` is detected:

- All animations set to 0.01ms
- Scroll behavior: auto
- Opacity transitions instant
- Content immediately visible

---

## Performance

### Image Optimization

- Next.js automatic WebP conversion
- Priority loading for hero images
- Lazy loading below the fold
- Explicit width/height to prevent CLS

### Font Loading

- `display: swap` for both fonts
- CSS variables for consistent reference
- Weights limited to essential (3 per family)

### Code Optimization

- Automatic code splitting
- Tree shaking in production
- Static generation (SSG)
- No client-side runtime dependencies

---

## File Structure

### Where Everything Lives

**Font Loading:**

- `app/layout.tsx` — Google Fonts imports, CSS variables

**Color Palette:**

- `tailwind.config.ts` — Color definitions

**Typography Config:**

- `tailwind.config.ts` — Font families, spacing, constraints

**CSS Variables:**

- `app/globals.css` — Root variables, prose styles

**Motion Settings:**

- `lib/motion.ts` — Animation timing, easing functions

---

## Branding Principles

### What This System Is

- Literary
- Intimate
- Restrained
- Reader-focused
- Accessible

### What This System Is Not

- Decorative
- Expressive
- UI-forward
- Marketing-driven
- Trend-chasing

### Contrast Strategy

Contrast comes from:

- Weight (400 vs 700)
- Spacing (tight vs generous)
- Rhythm (fast vs slow)
- Placement (hero vs body)
- Silence (negative space)

**Not from:**

- Multiple font families
- Bright colors
- Decorative elements
- Visual gimmicks

---

## Maintenance Guidelines

### When Adding Features

**Ask:**

1. Does this serve the reader or the system?
2. Does this add noise or clarity?
3. Can this be achieved with existing tools?

**Avoid:**

- New fonts
- New colors (unless contextual)
- Decorative animations
- Breaking reading flow

### Future Considerations

**Safe to add:**

- Contextual colors (error, focus)
- Accessibility enhancements
- Performance optimizations
- Reading experience refinements

**Avoid adding:**

- Expressive UI fonts
- Branding colors
- Marketing elements
- Decorative flourishes

---

## Version

**v1.0** — January 2026

This design system is intentionally minimal and should remain so. The story is the brand.
