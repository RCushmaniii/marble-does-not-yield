---
# === CONTROL FLAGS ===
portfolio_enabled: true
portfolio_priority: 5
portfolio_featured: false

# === CARD DISPLAY ===
title: "The Marble Does Not Yield"
tagline: "Bilingual literary web app with scroll-driven storytelling and WCAG AAA compliance"
slug: "marble-does-not-yield"
category: "Creative"
tech_stack:
  - "Next.js 14"
  - "TypeScript"
  - "React Server Components"
  - "Tailwind CSS"
  - "Vercel"
thumbnail: "/images/portfolio/marble-does-not-yield-thumb.jpg"
status: "Production"

# === DETAIL PAGE ===
problem: "Long-form bilingual literary content needs a web experience that serves the narrative, not the framework. Full i18n libraries add runtime overhead for a two-language site, streaming services complicate optional audio narration, and accessibility becomes critical when the content demands sustained attention."
solution: "A static-first Next.js app where every technical decision serves the reading experience. Custom i18n with JSON labels + Markdown prose, author-read audio via a single play/pause toggle, scroll-driven IntersectionObserver animations that respect prefers-reduced-motion, and 104 kB First Load JS through React Server Components."
key_features:
  - "Custom i18n architecture — JSON for labels + Markdown for prose, zero-overhead language switching without any i18n framework"
  - "Scroll-driven storytelling with multi-stage color fade animations (3.5s) via IntersectionObserver, all respecting prefers-reduced-motion"
  - "WCAG AAA compliance with proper contrast ratios, semantic HTML, and reduced-motion support for cognitively loaded content"
  - "104 kB First Load JS — static generation with React Server Components eliminates client-side hydration cost"
  - "Six-iteration UX refinement from complex audio player to minimal toggle, demonstrating taste and restraint"

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
video_poster: "/video/marble-does-not-yield-brief-poster.jpg"

# === LINKS ===
demo_url: "https://marble-does-not-yield.vercel.app/"
live_url: "https://marble-does-not-yield.vercel.app/"

# === OPTIONAL ===
metrics:
  - "104 kB First Load JS — zero client-side hydration cost"
  - "WCAG AAA compliance across both language variants"
  - "Six-iteration UX refinement process documented end-to-end"
  - "Zero i18n framework dependencies for full bilingual support"
tags:
  - "next-js"
  - "typescript"
  - "ai-assisted-development"
  - "bilingual"
  - "accessibility"
  - "narrative-design"
  - "audio-narration"
date_completed: "2025-10"
---

## Overview

The Marble Does Not Yield is a production-grade bilingual narrative web application built with Next.js 14. It presents long-form literary content in English and Spanish with author-read audio narration, restrained scroll-triggered animation, and accessibility-first design.

The project treats the web as a medium for serious storytelling. Every technical decision serves the narrative: animations are cinematic but restrained, controls are minimal, and the design prioritizes sustained reading over feature density. Typography uses Fraunces for display and Source Serif 4 for body, with a deliberate 72ch max-width and 1.75-1.8 line height.

Built as both a literary project and a portfolio demonstration, it showcases how AI-augmented development (Claude, Windsurf) works as a collaborative tool for architecture decisions, refactoring, debugging, and documentation — not as a code generator.
