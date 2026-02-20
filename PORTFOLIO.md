---
# === CONTROL FLAGS ===
portfolio_enabled: true
portfolio_priority: 3
portfolio_featured: true

# === CARD DISPLAY ===
title: "The Marble Does Not Yield"
tagline: "Bilingual narrative web app demonstrating AI-augmented development and human-centered design."
slug: "marble-does-not-yield"
category: "AI Automation"
tech_stack:
  - "Next.js 14 (App Router)"
  - "TypeScript"
  - "React Server Components"
  - "Tailwind CSS"
  - "@tailwindcss/typography"
  - "react-markdown"
  - "remark-gfm"
  - "rehype-raw"
  - "Vercel (deployment)"
  - "Markdown (content pipeline)"
thumbnail: "/images/portfolio/marble-does-not-yield-thumb.jpg"

# === DETAIL PAGE ===

# === MEDIA: PORTFOLIO SLIDES ===
slides:
  - src: "/images/portfolio/marble-does-not-yield-01.png"
    alt_en: "The Marble Does Not Yield slide 1"
    alt_es: "The Marble Does Not Yield diapositiva 1"
  - src: "/images/portfolio/marble-does-not-yield-02.png"
    alt_en: "The Marble Does Not Yield slide 2"
    alt_es: "The Marble Does Not Yield diapositiva 2"
  - src: "/images/portfolio/marble-does-not-yield-03.png"
    alt_en: "The Marble Does Not Yield slide 3"
    alt_es: "The Marble Does Not Yield diapositiva 3"
  - src: "/images/portfolio/marble-does-not-yield-04.png"
    alt_en: "The Marble Does Not Yield slide 4"
    alt_es: "The Marble Does Not Yield diapositiva 4"
  - src: "/images/portfolio/marble-does-not-yield-05.png"
    alt_en: "The Marble Does Not Yield slide 5"
    alt_es: "The Marble Does Not Yield diapositiva 5"
  - src: "/images/portfolio/marble-does-not-yield-06.png"
    alt_en: "The Marble Does Not Yield slide 6"
    alt_es: "The Marble Does Not Yield diapositiva 6"
  - src: "/images/portfolio/marble-does-not-yield-07.png"
    alt_en: "The Marble Does Not Yield slide 7"
    alt_es: "The Marble Does Not Yield diapositiva 7"
  - src: "/images/portfolio/marble-does-not-yield-08.png"
    alt_en: "The Marble Does Not Yield slide 8"
    alt_es: "The Marble Does Not Yield diapositiva 8"
  - src: "/images/portfolio/marble-does-not-yield-09.png"
    alt_en: "The Marble Does Not Yield slide 9"
    alt_es: "The Marble Does Not Yield diapositiva 9"
  - src: "/images/portfolio/marble-does-not-yield-10.png"
    alt_en: "The Marble Does Not Yield slide 10"
    alt_es: "The Marble Does Not Yield diapositiva 10"

# === MEDIA: VIDEO ===
video_url: "/video/marble-does-not-yield-brief.mp4"
video_poster: "/images/portfolio/cushlabs-brief-poster.jpg"

# === LINKS ===
demo_url: "https://marble-does-not-yield.vercel.app/"
live_url: "https://marble-does-not-yield.vercel.app/"

# === OPTIONAL ===
tags:
  - "next-js"
  - "typescript"
  - "ai-assisted-development"
  - "bilingual"
  - "accessibility"
  - "narrative-design"
  - "audio-narration"
---

## Overview

The Marble Does Not Yield is a production-grade bilingual narrative web application built with Next.js 14. It presents long-form literary content in English and Spanish with author-read audio narration, restrained scroll-triggered animation, and accessibility-first design.

The project treats the web as a medium for serious storytelling. Every technical decision serves the narrative: animations are cinematic but restrained, controls are minimal, and the design prioritizes sustained reading over feature density. Typography uses Fraunces for display and Source Serif 4 for body, with a deliberate 72ch max-width and 1.75-1.8 line height.

Built as both a literary project and a portfolio demonstration, it showcases how AI-augmented development (Claude, Windsurf) works as a collaborative tool for architecture decisions, refactoring, debugging, and documentation — not as a code generator.

## The Challenge

- **Bilingual delivery without framework overhead:** The project needed English and Spanish with perfect structural symmetry, but full i18n frameworks (next-intl, react-i18next) add runtime overhead and complexity disproportionate to a two-language site
- **Audio narration without streaming infrastructure:** Author-read narration needed to feel like part of the artwork — optional and quiet — without third-party streaming services or complex player UI
- **Accessibility for cognitively loaded content:** WCAG compliance matters more than usual when the content demands sustained attention. Contrast ratios, reduced-motion support, and semantic HTML aren't optional for a literary reading experience
- **Performance on a content-heavy page:** Multiple high-resolution images, an audio file, scroll-triggered animations, and bilingual routing need to load near-instantly without client-side hydration costs

## The Solution

**Type-safe i18n with JSON + Markdown separation:**
UI labels live in JSON files (`en.json`, `es.json`) while narrative prose lives in Markdown (`content/en/story.md`, `content/es/story.md`). A `Locale` union type and `SUPPORTED_LOCALES` array enforce type safety throughout. Adding a new language means adding files and one type update — no framework changes, zero runtime overhead.

**Static audio with minimal UX:**
The MP3 narration lives in `/public/audio/` and is served via Vercel's CDN with `preload="none"`. The UI is a single play/pause toggle with bilingual labels — no visible player, no streaming dependencies. The audio control evolved through six iterations based on user feedback to reach this minimal state.

**Server-side content pipeline:**
Markdown processing happens at build time with remark/rehype. React Server Components handle locale detection and content loading with zero client JS cost. The result: 104 kB First Load JS with statically generated pages.

**Scroll-driven storytelling:**
IntersectionObserver triggers multi-stage color fade animations (3.5s) as the reader progresses. All motion respects `prefers-reduced-motion`. The ending image is constrained to reading width to maintain narrative pacing.

## Technical Highlights

- **Custom i18n architecture:** JSON for labels + Markdown for prose, type-safe locale handling, zero-overhead language switching — built without any i18n framework
- **Proper Accept-Language parsing:** Middleware parses quality values and language priority order instead of naive substring matching, preventing false positives
- **Shared locale detection:** Single `detectLocale` utility eliminates logic drift between middleware and root page redirect
- **Static generation with dynamic routing:** `generateStaticParams` pre-renders both locale variants at build time for zero server cost
- **Progressive animation system:** Multi-stage color transitions with IntersectionObserver, centralized in `motion.ts` for consistency
- **Custom Tailwind breakpoint (1180px):** Purpose-built for the documentation viewer's tablet/desktop distinction

## Results

**For the End User / Team:**

- Bilingual literary content accessible to both English and Spanish readers with automatic language detection
- Optional audio narration that respects the reading experience rather than interrupting it
- WCAG AAA compliance ensures the content is accessible to readers with visual or motion sensitivities
- Near-instant page loads with static generation and zero server dependencies

**Technical Demonstration:**

- Production-grade bilingual architecture without third-party i18n framework overhead
- AI-augmented development workflow where Claude and Windsurf collaborate on architecture, debugging, and documentation — not just code generation
- Six-iteration UX refinement process from complex audio player to minimal toggle, demonstrating taste and restraint
- Comprehensive documentation system (`/docs`) with responsive viewer, showcasing the full development lifecycle

This project demonstrates that AI-assisted development produces its best results when paired with human judgment about what to leave out.
