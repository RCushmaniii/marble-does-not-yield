# WINDSURF RULES

**File:** `.WINDSURF/RULES/MAIN.md`  
**Purpose:** Core engineering principles, technical constraints, and best practices for AI assistants working on this project.

## Project Context

- **Name:** The Marble Does Not Yield
- **Type:** Bilingual narrative web experience
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Languages:** English/Spanish (en/es)
- **Philosophy:** Restrained design. Story provides emotion; system stays neutral.

---

## Operating Mode

- Think like a Senior Staff Engineer
- Default to clarity, restraint, predictable systems
- Optimize for maintainability and calm execution
- Question requirements that conflict with core principles
- Teach while building (explain root causes, not just fixes)

---

## Architecture

### Think in Systems

Always identify:

- **Runtime context:** server / client / edge
- **Lifecycle:** build-time / request-time / runtime
- **Responsibility:** data / layout / interaction
- If system can't be explained in 3-5 sentences → stop and clarify

### Simplicity First

- Prefer boring, proven solutions
- Avoid novelty unless it solves documented problem
- Complexity must earn its place
- No speculative extensibility
- Innovation belongs in experience, not dependencies

### Separation of Concerns

**Data:** Loading, validation, parsing, transformation  
**UI Structure:** Layout, typography, spacing, content presentation  
**Interaction:** State, events, observers, animations, browser APIs

**Never mix:** Interaction with data loading, or UI that hides runtime behavior

---

## Next.js App Router

### Server-First Default

- Assume Server Components by default
- Client Components only when required
- Every client component must justify existence

### Responsibilities

**Server:** Load/parse/transform data, compose layout, render static UI, handle i18n  
**Client:** User interaction, browser APIs, animations, viewport observation, audio controls

### Client Component Justification

Every `"use client"` file needs top comment:

```typescript
// Client Component because: uses IntersectionObserver for scroll-triggered fades
```

Weak justification → refactor to server component

### Boundary Integrity

- Parsing/loading → server utilities or server components
- Effects/observers → isolated client components
- No mixing of server and client responsibilities

---

## i18n

### Architecture

**JSON for UI labels:** `i18n/en.json` + `i18n/es.json` (perfect symmetry: same keys, same nesting)  
**Markdown for prose:** `content/en/story.md` + `content/es/story.md`

### Type Safety

```typescript
export type Locale = "en" | "es";
export const SUPPORTED_LOCALES: Locale[] = ["en", "es"];
```

### Rules

- Never hardcode text → always use translation keys
- Maintain key symmetry across all language files
- Default locale: Spanish (`es`)
- Parse `Accept-Language` header properly (no substring matching)
- AI translations require human review

### Common Pitfall

❌ `acceptLanguage.includes("en")` (matches "pt-EN")  
✅ Parse header, split by comma, extract language codes

---

## Design System

### Typography

**Fraunces (Display) - ONLY for:**

- H1 (hero title), section headings (h2, h3)
- Byline, authorial moments, small caps, section labels
- **Never:** paragraphs, inline emphasis, long text blocks

**Source Serif 4 (Body) - Use for:**

- All prose, italics, quotes, reading text

### Colors

```css
--void: #0d0d0d        /* Near-black background */
--parchment: #e8e6e1   /* Warm off-white text */
--ash: #6b6b6b         /* Muted accents */
```

- Intentionally limited palette
- No expressive branding colors
- Story provides emotion, system stays neutral
- All contrast ratios meet WCAG AAA

### Spacing

- Max reading width: 72ch
- Line height: 1.75–1.8
- Vertical spacing: generous, use `clamp()` for responsive scaling
- Whitespace is silence → protect it

---

## Animation

### Principles

- Hero establishes tone (one major animated moment per page max)
- Text fades quietly (subtle opacity/transform, slow ease-out)
- No spectacle by default (no bounce/spring unless required)
- Always respect `prefers-reduced-motion`
- Never introduce layout shift

### Approved Patterns

- Scroll-triggered fade-ins (IntersectionObserver)
- Hero sequence (image → title → byline → description)
- Subtle opacity transitions

### Forbidden Patterns

- Bounce/spring animations
- Parallax effects
- Decorative flourishes
- Auto-playing animations (except hero)

### Timing

```typescript
scrollFade: { duration: 1200, easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" }
```

---

## Code Quality

### Explicit Behavior

- Avoid patterns that hide costs, side-effects, runtime boundaries
- Prefer explicit state and effects
- Implicit behavior is suspect

### Failure States

**Assume:** Missing content, slow networks, unexpected screen sizes, partial data  
**System must:** Degrade gracefully, avoid layout shift, avoid runtime surprises  
**Failure should be quiet and dignified.**

### Completion Criteria

Work not complete until:

- ✅ `npm run build` succeeds
- ✅ Zero TypeScript errors
- ✅ Zero ESLint warnings
- ✅ Deprecated APIs removed
- ✅ Correctness verified (not assumed)

**No "probably works" finishes.**

### Write for Next Reader

- Favor clarity over cleverness
- Name things honestly
- Comment **why**, not what
- Reduce cognitive load
- Good code is calm code

---

## TypeScript

### Primitive Types

❌ Don't use: `String`, `Number`, `Boolean`, `Symbol`, `Object`  
✅ Use: `string`, `number`, `boolean`, `symbol`, `object`

### Generics

❌ No unused type parameters  
✅ Every generic type parameter must be used

### The `any` Type

❌ Don't use `any` (disables type checking)  
✅ Use `unknown` for truly unknown types

### Callbacks

❌ Don't use `any` for ignored returns → use `void`  
❌ Don't make callback params optional unnecessarily → write as non-optional

### Function Overloads

- **Ordering:** Specific signatures before general ones (TypeScript matches first)
- **Optional params:** Use optional parameters instead of multiple overloads
- **Union types:** Use unions instead of type-specific overloads

### Type Assertions

❌ Avoid `as` assertions (bypass type checking)  
✅ Prefer type guards and narrowing

---

## Patterns

### ✅ Approved

```typescript
// Static Generation
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

// Shared Utilities
export function detectLocale(acceptLanguage: string | null): Locale { ... }

// Component Composition
<Hero lang={locale} />
<StoryRenderer content={content} lang={locale} />
```

### ❌ Anti-Patterns

- **Nested absolute positioning** → use flexbox/grid
- **Substring matching for language** → parse headers properly, no `.includes()`
- **Hardcoded text** → always use translation keys
- **Client components without justification** → every `"use client"` needs comment

---

## Markdown Rendering

### Standard Stack

```bash
npm install react-markdown remark-gfm @tailwindcss/typography
```

```typescript
// tailwind.config.ts
plugins: [require("@tailwindcss/typography")];

// Component
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
```

### Critical Rules

- ✅ Use `react-markdown` (not custom HTML generation)
- ✅ Install `@tailwindcss/typography` (prose classes need it)
- ✅ Verify full stack: package → plugin → import → use
- ❌ Don't reinvent (solved problem)
- ❌ Don't add CSS to fix missing dependencies

**Saves ~40 minutes per incident**

---

## Audio

### Implementation

```
public/audio/marble-reading-complete.mp3
```

- Serve via static assets (not streaming)
- Use `preload="none"` for performance
- No autoplay (respect user choice)
- Simple play/pause toggle (no complex UI)
- Bilingual labels
- Optional, not intrusive
- Accessible with ARIA labels
- Positioned alongside language switcher

---

## Ambiguity Protocol

If anything is ambiguous:

1. Do not invent constraints
2. Do not assume preferences
3. State what is unclear
4. Ask minimum questions to proceed
5. If must proceed: use safest defaults, document assumptions

**Clarify, then build.**

---

## Performance

### Target Metrics

- Lighthouse: 99+ (all categories)
- First Load JS: <110 kB
- Static Generation: all pages pre-rendered
- Zero server cost: Vercel edge

### Optimization

- Next.js automatic image optimization
- Priority loading for hero images
- Lazy loading below fold
- Explicit width/height (prevent CLS)
- Font display: swap
- Audio: `preload="none"`

**Make optimizations explicit, not implicit.**

---

## Accessibility

### Standards

- Semantic HTML throughout
- WCAG AAA contrast ratios (minimum)
- Keyboard-visible focus states
- Motion-respecting animations
- Decorative images use empty alt text

### Reduced Motion

When `prefers-reduced-motion: reduce`:

- All animations → 0.01ms
- Scroll behavior → auto
- Opacity transitions → instant
- Content → immediately visible

---

## Maintenance

### When Adding Features - Ask:

1. Does this serve reader or system?
2. Does this add noise or clarity?
3. Can this be achieved with existing tools?

### Avoid

- New fonts
- New colors (unless contextual)
- Decorative animations
- Breaking reading flow

### DRY Principle

- Extract shared logic immediately when reused
- Single source of truth for business logic
- Utility functions over inline logic
- No duplication between server/client

---

## Error Handling

### Graceful Handling

All operations anticipate failure:

```typescript
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  return { success: false, error: "User-friendly message" };
}
```

### Recovery Protocol

1. Apologize briefly
2. Analyze why it failed (don't retry blindly)
3. Propose new fix
4. Never repeat same broken solution

---

## Testing & Verification

### Before Marking Complete

- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] TypeScript errors: 0
- [ ] ESLint warnings: 0
- [ ] Test in both languages (en/es)
- [ ] Test with reduced motion enabled
- [ ] Verify responsive behavior (mobile/desktop)
- [ ] Check console for warnings

### Manual Testing

- [ ] Hero animation plays correctly
- [ ] Scroll-triggered fades work
- [ ] Language switcher functions
- [ ] Audio player works (if applicable)
- [ ] All images load
- [ ] Typography renders correctly
- [ ] No layout shift on load

---

## Communication

### Bottom Line Up Front (BLUF)

- Start with direct answer or solution
- Explain context and reasoning second
- Show implementation details last

### Cognitive Load

- One step at a time for complex tasks
- Summary checkpoints after long sessions
- Don't dump 5 files of code at once

### Tone

- Professional but conversational
- Empathetic during debugging
- Opinionated but flexible
- No robotic "As an AI" phrasing

---

## Known Edge Cases

### Language Detection

**Problem:** Naive substring matching (`includes("en")`)  
**Solution:** Proper header parsing with language code extraction

### Markdown Rendering

**Problem:** Prose classes don't work  
**Solution:** Install `@tailwindcss/typography` plugin

### Audio Player Positioning

**Problem:** Overlap with language switcher  
**Solution:** Flexbox parent, remove absolute positioning

### OG Image References

**Problem:** Filename changes break metadata  
**Solution:** Verify asset references after renames

---

## Final Rule

> **Restraint is a feature.**

When in doubt:

- Choose clarity
- Choose silence
- Choose simplicity

---

## Related Documentation

- **[AI_STARTUP.md](AI_STARTUP.md)** - Onboarding index
- **[AI_ENGINEERING_RULES.md](AI_ENGINEERING_RULES.md)** - Detailed principles
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Typography, colors, animation
- **[LESSONS_LEARNED.md](LESSONS_LEARNED.md)** - Bug history and solutions
- **[README.md](../README.md)** - Project architecture

---

**This document is authoritative. If a change conflicts with these rules, the change is wrong.**
