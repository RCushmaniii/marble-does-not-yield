---
trigger: always_on
---

# PROJECT RULES

## 1. Stack & Context

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **Language:** TypeScript (Strict)
- **i18n:** English (`en`) & Spanish (`es`)
- **Philosophy:** Restrained design. Story provides emotion; system stays neutral.

## 2. Architecture & Boundaries

- **Server First:** Default to Server Components.
- **Client Justification:** Every `"use client"` directive requires a comment explaining _why_ it is needed (e.g., `// Client: Uses IntersectionObserver`).
- **No Magic:** Avoid abstractions that hide runtime costs.
- **Ambiguity:** If requirements are unclear, pause and ask. Do not guess.

## 3. Internationalization (i18n)

- **Symmetry:** `i18n/en.json` and `i18n/es.json` must have identical keys/structure.
- **Routing:** content lives in `content/[lang]/`.
- **Detection:** Never use `acceptLanguage.includes("en")`. Parse headers properly to avoid "pt-EN" false positives.

## 4. Design System (Hard Constraints)

- **Colors:**
  - Background: `bg-[#0d0d0d]` (Void) - _Never white._
  - Text: `text-[#e8e6e1]` (Parchment)
  - Accents: `text-[#6b6b6b]` (Ash)
- **Typography:**
  - Headings: **Fraunces** (Variable). _Never use for body text._
  - Body: **Source Serif 4** (Variable).
- **Layout:** Max-width `72ch` for reading.

## 5. Animation Physics

- **Rule:** Motion is for communication, not decoration.
- **Allowed:** Slow opacity fades, vertical reveals.
- **Forbidden:** Bounce, spring, parallax, layout shifts.
- **A11y:** If `prefers-reduced-motion` is detected, duration must be `0ms`.

## 6. TypeScript Standards

- **Strictness:** No `any`. No unused variables.
- **Types:** Use `interface` for data shapes, `type` for unions/primitives.
- **Completion:** A task is not done until `npm run build` passes with zero errors.

## 7. Audio

- **Assets:** `/public/audio/`.
- **Behavior:** `preload="none"`. No autoplay.
