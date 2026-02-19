# CLAUDE.md — The Marble Does Not Yield

## Project Overview

A production-grade bilingual narrative web application built with Next.js 14. Presents long-form literary content in English and Spanish with author-read audio narration, scroll-triggered animations, and accessibility-first design. Deployed to Vercel at marble-does-not-yield.vercel.app. Currently at v2.1.0.

## Tech Stack

- Next.js 14 (App Router, React Server Components)
- TypeScript 5
- Tailwind CSS 3.4 with @tailwindcss/typography
- react-markdown + remark-gfm + rehype-raw (content pipeline)
- Vercel (deployment, CDN)
- npm (package manager — uses package-lock.json)

## Project Structure

```
app/
  [lang]/           → Locale-based dynamic routes (en, es)
    layout.tsx      → Locale layout wrapper
    page.tsx        → Main narrative page (Hero + StoryRenderer)
    notes/page.tsx  → Author's notes page
  docs/             → Documentation viewer (non-localized)
  layout.tsx        → Root layout (fonts, metadata)
  page.tsx          → Root redirect (detects locale, redirects to /en or /es)
  globals.css       → Global styles, typography, custom properties

components/
  Hero.tsx            → Full-screen hero with title animation
  StoryRenderer.tsx   → Markdown renderer with image injection
  AudioPlayer.tsx     → Minimal play/pause audio toggle
  LanguageSwitcher.tsx → EN/ES toggle
  ScrollFadeImage.tsx → Scroll-based fade-in image
  FadeInSection.tsx   → Section-level fade animation
  HeroImage.tsx       → Responsive hero image (desktop/mobile)

content/
  en/story.md       → English narrative (Markdown)
  es/story.md       → Spanish narrative (Markdown)

i18n/
  en.json           → English UI strings
  es.json           → Spanish UI strings
  notes.en.json     → English notes page strings
  notes.es.json     → Spanish notes page strings

lib/
  detect-locale.ts  → Accept-Language header parser (shared utility)
  i18n.ts           → Translation loader, Locale type, SUPPORTED_LOCALES
  md.ts             → Markdown processing (remark/rehype pipeline)
  motion.ts         → Centralized animation settings

middleware.ts       → Locale detection + routing (skips /docs routes)
```

## Development Commands

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Key Patterns & Conventions

- **i18n architecture:** JSON for UI labels, Markdown for long-form prose. Never mix.
- **Locale type:** `Locale = "en" | "es"` defined in `lib/i18n.ts`. All locale references are type-safe.
- **Default locale:** Spanish (`es`) — this is a deliberate product decision, not a bug.
- **Component locale prop:** Components receive `lang` as a prop for locale-aware rendering.
- **Animations:** All motion settings centralized in `lib/motion.ts`. All animations respect `prefers-reduced-motion`.
- **Image tokens:** Story markdown uses `[[ENDING_IMAGE]]` token for image placement.
- **Static generation:** Both locale variants are pre-rendered at build time via `generateStaticParams`.
- **No .env required:** The project runs entirely on static assets and build-time processing.

## Design System

- Display font: Fraunces (titles, headings, bylines only)
- Body font: Source Serif 4 (all prose)
- Colors: `--void: #0d0d0d` (bg), `--parchment: #e8e6e1` (text), `--ash: #6b6b6b` (muted)
- Max prose width: 72ch
- Custom breakpoint: `docs: 1180px` for documentation viewer

## Current Focus

Project is stable and deployed. No active feature development.

## Known Issues

- `tsconfig.tsbuildinfo` is in the repo despite being in `.gitignore` (legacy commit)
- `content/story.md` and `content/story-bak.md` are legacy files from before bilingual support — the active stories are in `content/en/` and `content/es/`
- `.windsurf/` directory from previous AI tooling is still in the repo

## Environment Setup

No environment variables required. Clone, install, and run:

```powershell
git clone https://github.com/RCushmaniii/marble-does-not-yield.git
cd marble-does-not-yield
npm install
npm run dev
```
