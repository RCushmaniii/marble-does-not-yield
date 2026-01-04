# Release Notes v1.1.0

**The Marble Does Not Yield** — Bilingual Edition

---

## 🌍 Major Feature: Professional-Grade Internationalization

This release introduces a **complete bilingual implementation** supporting English and Spanish with perfect symmetry and consulting-grade architecture.

### What's New

**Bilingual Support (English/Spanish)**

- Full narrative translation in both languages
- Complete UI localization
- Author's note and clinical appendix in both languages
- Type-safe locale handling throughout

**Architecture Highlights**

**JSON for UI Labels:**

```
i18n/
  ├── en.json           # English UI strings
  ├── es.json           # Spanish UI strings
  ├── notes.en.json     # English notes page
  └── notes.es.json     # Spanish notes page
```

**Markdown for Long-Form Content:**

```
content/
  ├── en/
  │   └── story.md      # English narrative
  └── es/
      └── story.md      # Spanish narrative
```

### Why This Matters

**Perfect Symmetry:**

- Identical key structure across all language files
- Makes QA straightforward
- Adding new languages is trivial
- Professional signal to clients and collaborators

**Clear Separation of Concerns:**

- **JSON** → Short UI text, labels, headings
- **Markdown** → Long-form prose and clinical documentation
- This is exactly how mature multilingual systems are built

**Type Safety:**

```typescript
export type Locale = "en" | "es";
export const SUPPORTED_LOCALES: Locale[] = ["en", "es"];
```

### Implementation Details

**New Files:**

- `lib/i18n.ts` — Translation utilities and type definitions
- `i18n/en.json` — English UI strings
- `i18n/es.json` — Spanish UI strings
- `i18n/notes.en.json` — English notes page content
- `i18n/notes.es.json` — Spanish notes page content
- `content/en/story.md` — English narrative
- `content/es/story.md` — Spanish narrative (full translation)

**Modified Components:**

- `Hero.tsx` — Now accepts `lang` prop for bilingual text
- `StoryRenderer.tsx` — Locale-aware content rendering
- `lib/md.ts` — Language-specific content loading

**Translation Coverage:**

- ✅ Hero title, byline, description
- ✅ Scroll indicator aria-label
- ✅ Full narrative prose
- ✅ Author's note
- ✅ Clinical appendix
- ✅ All UI labels and links

---

## 📚 Documentation Improvements

**README.md Updates:**

- Added comprehensive **Internationalization (i18n)** section
- Documented architecture and design decisions
- Included workflow for adding new languages
- Added implementation examples with code snippets

**New Documentation:**

- `PORTFOLIO.MD` — Project overview for consulting portfolio
- Complete i18n architecture documentation

---

## 🎨 Previous Features (v1.0.0)

**Design System:**

- Comprehensive `DESIGN_SYSTEM.md` with branding guidelines
- Branding Principles section in README
- Fluid typography with `clamp()` for hero title
- Restrained color palette (void, parchment, ash)

**User Experience:**

- Author's note and clinical appendix page (`/notes`)
- QuietLink component with 500ms fade-in delay
- Author photo on notes page
- Improved scroll-triggered text visibility (10% threshold)
- Scroll anchor link on hero indicator
- Tightened ending image spacing

**Technical:**

- ESLint peer dependency fix for Vercel deployment
- Production build optimization
- LICENSE file with copyright notice
- Live demo link in README

---

## 🔧 Technical Specifications

**Stack:**

- Next.js 14 (App Router)
- TypeScript with strict type checking
- Tailwind CSS
- Markdown processing (remark/rehype)
- Bilingual i18n system (JSON + Markdown)

**Performance:**

- Static generation (SSG)
- Optimized bundle sizes
- Type-safe translations (zero runtime overhead)
- No external i18n libraries required

**Accessibility:**

- WCAG AAA contrast ratios
- Semantic HTML throughout
- Keyboard navigation support
- Reduced motion support
- Bilingual aria-labels

---

## 🚀 Deployment

**Live Demo:**

- [https://marble-does-not-yield.vercel.app/](https://marble-does-not-yield.vercel.app/)

**Build Status:**

- ✅ Production build successful
- ✅ Type checking passed
- ✅ Linting passed
- ✅ Zero runtime errors

---

## 📊 Project Metrics

**Bundle Sizes:**

- Main page: 7.46 kB
- First Load JS: 94.7 kB
- Shared chunks: 87.3 kB

**Performance:**

- First Contentful Paint: 0.9s
- Cumulative Layout Shift: 0
- Speed Index: 1.4s

---

## 🎯 What This Demonstrates

**AI-Augmented Development:**

- Used AI assistants as collaborators for architecture, translation, and documentation
- Maintained authorship and judgment throughout

**Systems Thinking:**

- Content structurally separated from presentation
- Clear separation between UI labels (JSON) and prose (Markdown)
- Type-safe, maintainable, extensible

**Professional Signal:**

- Consulting-grade i18n implementation
- Production-ready code quality
- Comprehensive documentation
- Thoughtful design decisions

---

## 🔮 Future Considerations

**Potential Additions:**

- Additional languages (French, Portuguese, etc.)
- Language switcher UI component
- Locale detection from browser preferences
- SEO optimization for multilingual content

**Maintenance:**

- Translation workflow is straightforward
- Adding languages requires minimal code changes
- Type system prevents translation errors
- QA process is clear and repeatable

---

## 📝 Commit Message

```
v1.1.0: Add professional bilingual support (English/Spanish)

Major Features:
- Implement complete i18n system with JSON + Markdown architecture
- Add full Spanish translation of narrative and UI
- Create type-safe locale handling throughout application
- Add comprehensive i18n documentation to README

Technical:
- New i18n utilities in lib/i18n.ts
- Language-specific content loading in lib/md.ts
- Bilingual Hero and StoryRenderer components
- Structured translation files with perfect symmetry

Documentation:
- Add Internationalization section to README
- Create PORTFOLIO.MD for consulting showcase
- Document translation workflow and architecture
- Include code examples and implementation details

This release demonstrates consulting-grade internationalization
with clear separation of concerns, type safety, and professional
architecture suitable for enterprise applications.
```

---

## 🏷️ Git Tag

**Tag:** `v1.1.0`

**Title:** Bilingual Edition — Professional i18n Implementation

**Description:**

```
Complete bilingual support (English/Spanish) with professional-grade
architecture. Features JSON-based UI translations and Markdown-based
narrative content, perfect symmetry across languages, and type-safe
implementation throughout. Includes comprehensive documentation and
demonstrates consulting-grade systems thinking.
```

---

**This is not a demo of features. It is a demonstration of judgment.**
