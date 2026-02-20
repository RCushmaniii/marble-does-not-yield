# The Marble Does Not Yield

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

> A cinematic, single-page narrative experience that combines long-form bilingual storytelling with restrained animation, audio narration, and accessibility-first design.

## Overview

The Marble Does Not Yield is a production-grade web application built to present serious literary prose without distraction. It serves a bilingual audience (English and Spanish) with author-read audio narration, scroll-triggered imagery, and typography designed for sustained reading.

The site treats the web as a medium for storytelling — not a platform for features. Every technical decision serves the narrative: animations are restrained, controls are minimal, and the design stays out of the reader's way.

Built with Next.js 14 and React Server Components, the project demonstrates how AI-augmented development can deliver human-centered experiences with professional engineering discipline.

**[View Live](https://marble-does-not-yield.vercel.app/)**

## The Challenge

Long-form prose on the web faces two recurring problems: either the technology overwhelms the content (complex frameworks, heavy interactivity, distracting UI), or the presentation is so bare that it fails to do the writing justice.

This project needed to solve several specific constraints simultaneously:

- **Bilingual content** — English and Spanish with perfect structural symmetry, without the overhead of a full i18n framework
- **Audio narration** — Author-read audio that feels optional, not intrusive, with zero streaming infrastructure
- **Accessibility** — WCAG AAA contrast ratios, reduced-motion support, and semantic HTML for a reading-heavy experience
- **Performance** — Near-instant loads for a content-heavy page with multiple images and an audio file

## The Solution

**Type-safe bilingual architecture:**
JSON files handle UI labels and short text, while Markdown files handle long-form prose. The separation means adding a new language requires only new JSON and Markdown files plus a one-line type update — no framework changes.

**Static audio delivery:**
The MP3 narration lives in `/public/audio/` and is served via Vercel's CDN with `preload="none"`. A single play/pause toggle with bilingual labels replaces the typical audio player UI — present when wanted, absent when not.

**Scroll-driven storytelling:**
IntersectionObserver triggers subtle fade-in animations as the reader progresses. All motion respects `prefers-reduced-motion` and the animations use a multi-stage color transition (3.5s) for cinematic pacing.

**Server-side content pipeline:**
Markdown processing happens at build time via remark/rehype, producing statically generated pages with zero client-side content loading.

## Technical Highlights

- **React Server Components** — Content processing and locale detection happen server-side with zero client JS cost
- **Custom i18n without framework overhead** — Type-safe `Locale` union type with JSON + Markdown separation; zero runtime translation errors
- **Proper Accept-Language parsing** — Middleware parses quality values and language priority instead of naive substring matching
- **104 kB First Load JS** — Static generation, code splitting, and lazy loading below the fold
- **Custom Tailwind breakpoint (1180px)** — Optimized tablet/desktop distinction for the documentation viewer
- **Shared locale detection** — Single `detectLocale` utility used by both middleware and root page, eliminating logic drift

## Getting Started

### Prerequisites

- Node.js >= 18
- npm (lockfile uses npm)

### Installation

```powershell
npm install
```

### Run Development Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```powershell
npm run build
npm start
```

### Environment Variables

No environment variables are required. The project runs entirely on static assets and build-time content processing.

## Live Demo

**[Try it live](https://marble-does-not-yield.vercel.app/)**

Test scenarios:
1. Visit the site in a browser set to Spanish — language detection redirects to the Spanish version automatically
2. Click the headphone icon to start audio narration, then toggle language to see bilingual labels
3. Scroll through the narrative to see the fade-in animations (try enabling reduced-motion in your OS to see the accessible fallback)

## Project Structure

```
marble-does-not-yield/
├── app/
│   ├── [lang]/             # Locale-based dynamic routes
│   │   ├── layout.tsx      # Locale layout wrapper
│   │   ├── page.tsx        # Main narrative page
│   │   └── notes/          # Author's notes page
│   ├── docs/               # Documentation viewer
│   │   ├── page.tsx        # Documentation index
│   │   └── [slug]/         # Dynamic doc routes
│   │       ├── page.tsx    # Doc page (server component)
│   │       └── DocViewer.tsx # Client-side doc renderer
│   ├── sitemap.ts          # Dynamic sitemap generator
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Root redirect (locale detection)
│   └── globals.css         # Global styles and typography
├── components/
│   ├── Hero.tsx            # Full-screen hero with title animation
│   ├── HeroImage.tsx       # Responsive hero image (desktop/mobile)
│   ├── StoryRenderer.tsx   # Markdown renderer with image injection
│   ├── AudioPlayer.tsx     # Minimal play/pause audio control
│   ├── LanguageSwitcher.tsx # EN/ES toggle
│   ├── QuietLink.tsx       # Minimal styled link component
│   ├── ScrollFadeImage.tsx # Scroll-based fade-in image
│   └── FadeInSection.tsx   # Section-level fade animation
├── content/
│   ├── en/story.md         # English narrative
│   └── es/story.md         # Spanish narrative
├── i18n/
│   ├── en.json             # English UI strings
│   ├── es.json             # Spanish UI strings
│   ├── notes.en.json       # English notes
│   └── notes.es.json       # Spanish notes
├── lib/
│   ├── detect-locale.ts    # Accept-Language parser
│   ├── i18n.ts             # Translation loader + types
│   ├── md.ts               # Markdown processing pipeline
│   └── motion.ts           # Centralized animation settings
├── public/
│   ├── audio/              # Author-read MP3 narration
│   ├── images/             # Hero, ending, OG images
│   │   └── portfolio/      # Portfolio screenshots
│   └── video/              # Demo video + poster
├── middleware.ts            # Locale detection + routing
├── tailwind.config.ts
├── package.json
└── next.config.js
```

## Deployment

Deployed on Vercel with automatic builds from the main branch.

### Manual Deployment

```powershell
npm install -g vercel
vercel
```

### GitHub Integration

1. Push the repository to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no additional configuration required

## Results

The project delivers a reading experience that respects both the content and the reader.

| Metric | Target | Actual |
|--------|--------|--------|
| First Load JS | <150 kB | 104 kB |
| Lighthouse Performance | 95+ | 99 |
| Runtime translation errors | 0 | 0 |
| TypeScript errors | 0 | 0 |
| Server cost | $0 | $0 (static generation) |
| Languages supported | 2 | 2 (EN/ES, extensible) |

The bilingual content maintains perfect structural symmetry — same keys, same nesting — making QA straightforward and additional languages a matter of adding files rather than changing architecture.

Audio narration evolved through six iterations based on user feedback, arriving at the minimal play/pause toggle that matches the site's quiet aesthetic.

## Contact

**Robert Cushman**
Business Solution Architect & Full-Stack Developer
Guadalajara, Mexico

📧 info@cushlabs.ai
🔗 [GitHub](https://github.com/RCushmaniii) • [LinkedIn](https://linkedin.com/in/robertcushman) • [Portfolio](https://cushlabs.ai)

## License

© 2026 Robert Cushman III. All rights reserved. See [LICENSE](./LICENSE) for details.

---

*Last Updated: 2026-02-20*
