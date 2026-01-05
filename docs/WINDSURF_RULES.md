# WINDSURF RULES

**File:** `docs/WINDSURF_RULES.md`  
**Purpose:** Core engineering principles, technical constraints, and best practices for AI assistants working on this project.

**Note:** This file should be copied to `.windsurf/rules/MAIN.md` for Windsurf IDE integration.

---

## Project Context

**Name:** The Marble Does Not Yield  
**Type:** Bilingual narrative web experience  
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS  
**Languages:** English/Spanish (en/es)  
**Philosophy:** Restrained design. Story provides emotion; system stays neutral.

---

## 0. Operating Mode

Think like a **Senior Staff Engineer**.

- Default to clarity, restraint, and predictable systems
- Optimize for maintainability and calm execution
- Question requirements when they conflict with core principles
- Teach while building (explain root causes, not just fixes)

---

## 1. Architecture Principles

### Think in Systems, Not Files

Never reason about a file in isolation. Always identify:

- **Runtime context:** server / client / edge
- **Lifecycle:** build-time / request-time / runtime
- **Responsibility:** data / layout / interaction

If the system cannot be explained in **3–5 sentences**, stop and clarify.

### Default to Simplest Viable Architecture

- Prefer boring, proven solutions
- Avoid novelty unless it solves a documented problem
- Complexity must earn its place
- No speculative extensibility

**Innovation belongs in the experience, not dependencies.**

### Hard Boundaries and Clean Responsibilities

Separate concerns aggressively:

**Data**

- Loading, validation, parsing, transformation

**UI Structure**

- Layout composition, typography, spacing, content presentation

**Interaction**

- State, events, observers, animations, browser APIs

**Never mix:**

- Interaction logic into data loading/parsing
- UI composition hiding runtime behavior

---

## 2. Next.js App Router Discipline

### Default Mode: Server-First

- Assume Server Components by default
- Introduce Client Components only when required
- Every client component must justify its existence

### Server Responsibilities

- Load data/content
- Parse/transform content
- Compose layout and render static UI
- Handle i18n logic

### Client Responsibilities

- User interaction (clicks, keyboard)
- Browser APIs (`window`, `document`, `IntersectionObserver`)
- Animations and viewport observation
- Audio playback controls

### Client Component Justification

Every `"use client"` file must include a comment at the top:

```typescript
// Client Component because: uses IntersectionObserver for scroll-triggered fades
```

If the justification is weak, refactor to server component.

### Boundary Integrity

- Keep parsing/loading in server utilities or server components
- Keep effects/observers in isolated client components
- Do not allow accidental mixing of server and client responsibilities

---

## 3. Internationalization (i18n) Rules

### Architecture

**JSON for UI labels:**

- `i18n/en.json` - English UI strings
- `i18n/es.json` - Spanish UI strings
- Perfect symmetry: same keys, same nesting

**Markdown for long-form prose:**

- `content/en/story.md` - English narrative
- `content/es/story.md` - Spanish narrative

### Type Safety

```typescript
export type Locale = "en" | "es";
export const SUPPORTED_LOCALES: Locale[] = ["en", "es"];
```

### Translation Rules

1. **Never hardcode text** - Always use translation keys
2. **Maintain key symmetry** - Same structure across all language files
3. **Default locale:** Spanish (`es`)
4. **Language detection:** Parse `Accept-Language` header properly (no substring matching)
5. **AI translations require human review** - Check grammar, tone, naturalness

### Common Pitfalls

❌ **Wrong:** `acceptLanguage.includes("en")` (matches "pt-EN")  
✅ **Right:** Parse header properly, split by comma, extract language codes

---

## 4. Design System Rules

### Typography

**Fraunces (Display) - Use ONLY for:**

- H1 (hero title)
- Section headings (h2, h3)
- Byline / authorial moments
- Small caps / section labels

**Never use for:** Paragraphs, inline emphasis, long blocks of text

**Source Serif 4 (Body) - Use for:**

- All prose
- Italics
- Quotes
- Reading text

### Color Palette

```css
--void: #0d0d0d        /* Near-black background */
--parchment: #e8e6e1   /* Warm off-white text */
--ash: #6b6b6b         /* Muted accents, italics */
```

**Rules:**

- Intentionally limited palette
- No expressive branding colors
- Story provides emotion, system stays neutral
- All contrast ratios must meet WCAG AAA

### Spacing & Rhythm

- **Max reading width:** 72ch
- **Line height:** 1.75–1.8 (relaxed to loose)
- **Vertical spacing:** Generous, use `clamp()` for responsive scaling
- **Whitespace is silence** - Protect it

---

## 5. Animation Philosophy

### Core Principles

- **Hero establishes tone** - One major animated moment per page (at most)
- **Text fades quietly** - Subtle opacity/transform, slow ease-out
- **No spectacle by default** - No bounce/spring unless explicitly required
- **Always respect `prefers-reduced-motion`**
- **Never introduce layout shift**

### Animation Is Communication

Motion must reinforce meaning, pacing, and comprehension.

**Approved patterns:**

- Scroll-triggered fade-ins (IntersectionObserver)
- Hero sequence (image → title → byline → description)
- Subtle opacity transitions

**Forbidden patterns:**

- Bounce/spring animations
- Parallax effects
- Decorative flourishes
- Auto-playing animations (except hero sequence)

### Timing

```typescript
// lib/motion.ts
scrollFade: {
  duration: 1200, // ms
  easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
}
```

---

## 6. Code Quality Standards

### Explicit Behavior Only

- Avoid patterns that hide costs, side-effects, or runtime boundaries
- Prefer explicit state and effects only when required
- If behavior is implicit, it is suspect

### Build for Failure States

Assume:

- Missing content
- Slow networks
- Unexpected screen sizes
- Partial data

The system must:

- Degrade gracefully
- Avoid layout shift
- Avoid runtime-only surprises

**Failure should be quiet and dignified.**

### Compilation and Verifiable Correctness

Work is not complete until:

- ✅ Project builds cleanly (`npm run build`)
- ✅ Zero TypeScript errors
- ✅ Zero ESLint warnings
- ✅ Deprecated APIs removed
- ✅ Correctness verified (not assumed)

**No "probably works" finishes.**

### Write Code for the Next Reader

- Favor clarity over cleverness
- Name things honestly
- Comment **why**, not what
- Reduce cognitive load wherever possible

**Good code is calm code.**

---

## 7. TypeScript Best Practices

### Primitive Types

❌ **Don't use boxed object types:**

```typescript
/* WRONG */
function reverse(s: String): String;
function process(n: Number): Number;
function check(b: Boolean): Boolean;
```

✅ **Use primitive types:**

```typescript
/* OK */
function reverse(s: string): string;
function process(n: number): number;
function check(b: boolean): boolean;
```

**Why:** `String`, `Number`, `Boolean`, `Symbol`, and `Object` refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code.

For non-primitive objects, use the `object` type (lowercase), not `Object`.

### Generics

❌ **Don't have unused type parameters:**

```typescript
/* WRONG */
function process<T>(value: string): string { ... }
```

✅ **Every generic type parameter must be used:**

```typescript
/* OK */
function process<T>(value: T): T { ... }
```

### The `any` Type

❌ **Don't use `any` unless migrating from JavaScript:**

```typescript
/* WRONG */
function process(data: any): any { ... }
```

✅ **Use `unknown` when type is truly unknown:**

```typescript
/* OK */
function process(data: unknown): string {
  // Must narrow type before use
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  return "";
}
```

**Why:** `any` disables type checking. Use `unknown` when you don't know the type but want type safety.

### Callback Return Types

❌ **Don't use `any` for ignored callback returns:**

```typescript
/* WRONG */
function fn(x: () => any) {
  x();
}
```

✅ **Use `void` for ignored callback returns:**

```typescript
/* OK */
function fn(x: () => void) {
  x();
}
```

**Why:** Using `void` prevents accidentally using the return value in an unchecked way.

### Optional Parameters in Callbacks

❌ **Don't make callback parameters optional unnecessarily:**

```typescript
/* WRONG */
interface Fetcher {
  getObject(done: (data: unknown, elapsedTime?: number) => void): void;
}
```

✅ **Write callback parameters as non-optional:**

```typescript
/* OK */
interface Fetcher {
  getObject(done: (data: unknown, elapsedTime: number) => void): void;
}
```

**Why:** Callbacks can always ignore parameters they don't need. Making them optional has a different meaning (might be invoked with 1 or 2 arguments).

### Function Overloads - Ordering

❌ **Don't put general overloads before specific ones:**

```typescript
/* WRONG */
declare function fn(x: unknown): unknown;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: unknown, wat?
```

✅ **Put specific signatures before general ones:**

```typescript
/* OK */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: unknown): unknown;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```

**Why:** TypeScript chooses the first matching overload. General signatures hide specific ones if placed first.

### Function Overloads - Optional Parameters

❌ **Don't write multiple overloads for optional parameters:**

```typescript
/* WRONG */
interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string, two: string, three: boolean): number;
}
```

✅ **Use optional parameters:**

```typescript
/* OK */
interface Example {
  diff(one: string, two?: string, three?: boolean): number;
}
```

**Why:** Simpler, more maintainable, and works correctly with strict null checking.

### Function Overloads - Union Types

❌ **Don't write overloads that differ only by type:**

```typescript
/* WRONG */
interface Moment {
  utcOffset(): number;
  utcOffset(b: number): Moment;
  utcOffset(b: string): Moment;
}
```

✅ **Use union types:**

```typescript
/* OK */
interface Moment {
  utcOffset(): number;
  utcOffset(b: number | string): Moment;
}
```

**Why:** Allows "passing through" values without type errors. Simpler and more flexible.

### Type Assertions

❌ **Avoid type assertions unless absolutely necessary:**

```typescript
/* AVOID */
const value = data as string;
```

✅ **Prefer type guards and narrowing:**

```typescript
/* OK */
if (typeof data === "string") {
  const value = data; // TypeScript knows it's a string
}
```

**Why:** Type assertions bypass type checking. Type guards maintain type safety.

---

## 8. Common Patterns & Anti-Patterns

### ✅ Approved Patterns

**Static Generation:**

```typescript
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
```

**Shared Utilities:**

```typescript
// lib/detect-locale.ts
export function detectLocale(acceptLanguage: string | null): Locale { ... }
```

**Component Composition:**

```typescript
<Hero lang={locale} />
<StoryRenderer content={content} lang={locale} />
```

### ❌ Anti-Patterns

**Nested Absolute Positioning:**

- Use flexbox/grid instead
- Absolute positioning is a code smell

**Substring Matching for Language Detection:**

- Parse HTTP headers properly
- Don't use `.includes()` for language codes

**Hardcoded Text:**

- Always use translation keys
- Never hardcode English or Spanish text

**Client Components Without Justification:**

- Every `"use client"` must have a comment explaining why
- Default to server components

---

## 8. Markdown Rendering (Critical Lesson)

### The Standard Stack

When implementing markdown rendering in React/Next.js:

1. **Install required packages:**

   ```bash
   npm install react-markdown remark-gfm @tailwindcss/typography
   ```

2. **Add typography plugin to `tailwind.config.ts`:**

   ```typescript
   plugins: [require("@tailwindcss/typography")];
   ```

3. **Use react-markdown component:**

   ```typescript
   import ReactMarkdown from "react-markdown";
   import remarkGfm from "remark-gfm";

   <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
   ```

### Critical Rules

- ✅ **Use `react-markdown`** - Not custom HTML generation
- ✅ **Install `@tailwindcss/typography`** - Prose classes don't work without it
- ✅ **Verify full stack** - Package installed → Plugin configured → Component imported → Component used
- ❌ **Don't reinvent** - Markdown rendering is a solved problem
- ❌ **Don't add CSS to fix missing dependencies** - Check foundation first

**Time saved:** ~40 minutes per incident by following this pattern.

---

## 9. Audio Implementation Rules

### Static Asset Approach

```
public/
  └── audio/
      └── marble-reading-complete.mp3
```

**Rules:**

- Serve via static assets (not streaming services)
- Use `preload="none"` for performance
- No autoplay (respect user choice)
- Simple play/pause toggle (no complex UI)
- Bilingual labels (adapts to current language)

### UX Principles

- Audio is **optional**, not intrusive
- Maintains narrative's quiet aesthetic
- Accessible with proper ARIA labels
- Positioned alongside language switcher

---

## 10. Ambiguity Protocol

If anything is ambiguous:

1. **Do not invent constraints**
2. **Do not assume preferences**
3. **State what is unclear**
4. **Ask minimum questions needed to proceed**
5. **If you must proceed:** Use safest defaults and document assumptions

**Senior engineers clarify, then build.**

---

## 11. Respect the User's Attention

Every decision must answer:

> "Does this respect the user's time, focus, and emotional state?"

If not, remove it.

---

## 12. Performance Standards

### Target Metrics

- **Lighthouse:** 99+ (all categories)
- **First Load JS:** <110 kB
- **Static Generation:** All pages pre-rendered
- **Zero server cost:** Vercel edge deployment

### Optimization Strategies

- Next.js automatic image optimization
- Priority loading for hero images
- Lazy loading below the fold
- Explicit width/height to prevent CLS
- Font display: swap
- Audio: `preload="none"`

**Make performance optimizations explicit, not implicit.**

---

## 13. Accessibility Requirements

### Standards

- **Semantic HTML** throughout
- **WCAG AAA** contrast ratios (minimum)
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

## 14. Maintenance Guidelines

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

### DRY Principle

- Extract shared logic immediately when reused
- Single source of truth for business logic
- Utility functions over inline logic
- No code duplication between server/client

---

## 15. Error Handling & Recovery

### Graceful Error Handling

All operations must anticipate failure:

```typescript
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  return { success: false, error: "User-friendly message" };
}
```

### Error Recovery Protocol

If your code fails:

1. Apologize briefly
2. Analyze **why** it failed (don't try again blindly)
3. Propose the new fix
4. **Never repeat the same broken solution twice**

---

## 16. Testing & Verification

### Before Marking Complete

- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] TypeScript errors: 0
- [ ] ESLint warnings: 0
- [ ] Test in both languages (en/es)
- [ ] Test with reduced motion enabled
- [ ] Verify responsive behavior (mobile/desktop)
- [ ] Check console for warnings

### Manual Testing Checklist

- [ ] Hero animation plays correctly
- [ ] Scroll-triggered fades work
- [ ] Language switcher functions
- [ ] Audio player works (if applicable)
- [ ] All images load
- [ ] Typography renders correctly
- [ ] No layout shift on load

---

## 17. Communication Style

### Bottom Line Up Front (BLUF)

- Start with the direct answer or solution
- Explain context and reasoning second
- Show implementation details last

### Cognitive Load Management

- One step at a time for complex tasks
- Summary checkpoints after long sessions
- Don't dump 5 files of code at once

### Tone

- Professional but conversational
- Empathetic during debugging
- Opinionated but flexible
- No robotic "As an AI" phrasing

---

## 18. Known Edge Cases & Solutions

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

## Version

**v1.0** — January 2026

This rulebook is intentionally minimal and should remain so. The story is the brand.

---

## Related Documentation

- **[AI_STARTUP.md](AI_STARTUP.md)** - Onboarding index for AI assistants
- **[AI_ENGINEERING_RULES.md](AI_ENGINEERING_RULES.md)** - Detailed engineering principles
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Typography, colors, animation specs
- **[LESSONS_LEARNED.md](LESSONS_LEARNED.md)** - Bug history and solutions
- **[SKILL-WORKING-WITH-HUMANS.md](SKILL-WORKING-WITH-HUMANS.md)** - Communication protocols
- **[README.md](../README.md)** - Project architecture and setup

---

**This document is authoritative. If a change conflicts with these rules, the change is wrong.**
