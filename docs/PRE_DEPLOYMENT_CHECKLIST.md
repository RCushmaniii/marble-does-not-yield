# PRE DEPLOYMENT CHECKLIST

**File:** `docs/PRE_DEPLOYMENT_CHECKLIST.md`  
**Purpose:** Pre-deployment verification checklist ensuring production readiness

---

## Pre-Deployment Checklist

**Narrative & Portfolio-Grade Web Projects**

This checklist defines the **minimum professional standard** required before deploying a project to production.

It is intentionally opinionated, restrained, and scoped for:

- Next.js App Router projects
- Narrative / content-driven experiences
- Portfolio-quality work
- Vercel deployment

This is not enterprise bloat.
This is correctness, clarity, and dignity.

---

## ✅ How to Use This Checklist

1. **Run the automated checks** (command line)
2. **Perform the manual checks** (5–10 minutes total)
3. **Resolve all ❌ or ⚠️ items intentionally**
   - Either fix them
   - Or explicitly document why they are acceptable
4. Only deploy when:
   - All critical checks pass
   - Any omissions are _intentional_, not accidental

> Rule:  
> **If something is skipped, it must be skipped on purpose.**

---

## 🔨 1. Build & Compilation (Non-Negotiable)

### Automated

- [ ] `npm run build` passes cleanly

  - No build errors
  - No Server/Client boundary violations
  - No deprecated API warnings
  - All routes generate successfully

- [ ] TypeScript validation passes

  ```bash
  npx tsc --noEmit
  ```

  - No type errors
  - No `any` types in critical paths

- [ ] ESLint passes
  ```bash
  npm run lint
  ```
  - No errors
  - Warnings reviewed and acceptable

### Manual

- [ ] All pages load without errors in dev mode
- [ ] No console errors in browser DevTools
- [ ] Hot reload works correctly

---

## 🎨 2. Core Functionality

### Internationalization (i18n)

- [ ] Both languages load correctly (`/en` and `/es`)
- [ ] Language switcher works on all pages
- [ ] Browser language detection works (test with different Accept-Language headers)
- [ ] Spanish is default for non-EN/ES browsers
- [ ] All UI strings are translated (no hardcoded English)
- [ ] Middleware correctly routes language paths

### Audio Narration

- [ ] Audio player appears in header on both language pages
- [ ] Play/pause toggle works correctly
- [ ] Audio file loads and plays (`/public/audio/marble-narration.mp3`)
- [ ] "Listen" / "Escuchar" labels display correctly
- [ ] Audio preload="none" is set (no auto-download)
- [ ] Audio controls are accessible

### Documentation Viewer

- [ ] `/docs` redirects to `/docs/INDEX`
- [ ] All documentation pages load correctly
- [ ] Navigation sidebar works on desktop (≥ 1180px)
- [ ] Hamburger menu works on mobile/tablet (< 1180px)
- [ ] Internal markdown links work correctly
- [ ] Text wraps properly on all device sizes
- [ ] No horizontal overflow on any page
- [ ] Typography scales responsively
- [ ] "Back to Site" link works

### Story Content

- [ ] Hero image loads correctly (desktop and mobile versions)
- [ ] Scroll animations work smoothly
- [ ] Text is readable and properly formatted
- [ ] All content sections render correctly
- [ ] Footer displays properly

---

## 📱 3. Responsive Design

### Breakpoints to Test

Test at these specific widths:

- **Mobile:** 375px (iPhone), 390px (iPhone Pro)
- **Tablet:** 768px (iPad portrait), 1024px (iPad landscape)
- **Desktop:** 1180px (docs breakpoint), 1440px, 1920px

### Checks

- [ ] Mobile (< 768px)

  - Hamburger menu appears in docs viewer
  - Content is readable without horizontal scroll
  - Touch targets are appropriately sized
  - Images scale correctly

- [ ] Tablet (768px - 1179px)

  - Docs viewer uses hamburger menu
  - Layout is comfortable and readable
  - No awkward text wrapping

- [ ] Desktop (≥ 1180px)
  - Docs viewer shows fixed sidebar
  - Content is centered with proper margins
  - Typography is appropriately sized

---

## ⚡ 4. Performance

### Lighthouse Scores (Target: 95+)

Run Lighthouse in incognito mode:

- [ ] Performance: 95+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

### Specific Checks

- [ ] Images are optimized (WebP/AVIF when possible)
- [ ] Fonts load efficiently (no FOUT/FOIT)
- [ ] No render-blocking resources
- [ ] Audio file doesn't auto-download (preload="none")
- [ ] Language detection adds < 0.5ms overhead
- [ ] Static generation works for all routes

---

## 🔍 5. SEO & Metadata

### Meta Tags

- [ ] Title tag is present and descriptive
- [ ] Meta description is present (150-160 characters)
- [ ] Open Graph tags are present
  - `og:title`
  - `og:description`
  - `og:image` (1200x630px)
  - `og:url`
  - `og:type`
- [ ] Canonical URL is set correctly
- [ ] Language alternates are declared (`hreflang`)

### Content

- [ ] H1 tag is present on each page
- [ ] Heading hierarchy is logical (H1 → H2 → H3)
- [ ] Images have alt text
- [ ] Links have descriptive text (no "click here")

---

## ♿ 6. Accessibility

### Automated

- [ ] Lighthouse Accessibility score: 95+
- [ ] No ARIA violations in browser DevTools

### Manual

- [ ] Keyboard navigation works
  - Tab through all interactive elements
  - Enter/Space activate buttons
  - Escape closes modals/menus
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader landmarks are present
  - `<header>`, `<main>`, `<nav>`, `<footer>`
- [ ] Audio player has proper ARIA labels
- [ ] Language switcher is keyboard accessible
- [ ] Docs hamburger menu has aria-label

---

## 🔒 7. Security

### Headers

- [ ] Content Security Policy is appropriate
- [ ] No sensitive data in client bundles
- [ ] Environment variables are properly secured
- [ ] API keys (if any) are server-side only

### Content

- [ ] No hardcoded secrets in code
- [ ] No console.log statements with sensitive data
- [ ] External links use `rel="noopener noreferrer"` when appropriate

---

## 🌐 8. Browser Compatibility

Test in:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Specific Checks

- [ ] Audio player works in all browsers
- [ ] Language detection works in all browsers
- [ ] Animations work smoothly
- [ ] No layout shifts

---

## 📄 9. Content & Copy

- [ ] All text is proofread (no typos)
- [ ] All links work (no 404s)
- [ ] All images load correctly
- [ ] Audio narration matches text content
- [ ] Both language versions are complete
- [ ] LICENSE file is present and correct
- [ ] README is up to date

---

## 🚀 10. Deployment Configuration

### Vercel Settings

- [ ] Project is connected to correct Git repository
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Install command: `npm install`
- [ ] Node version: 18.x or 20.x
- [ ] Environment variables are set (if any)

### Domain & DNS

- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate is active
- [ ] DNS records are correct
- [ ] Redirects are configured (if needed)

---

## 📋 11. Documentation

- [ ] README.md is complete and accurate
- [ ] All docs in `/docs` directory are up to date
- [ ] Release notes for v2.1.0 are complete
- [ ] LESSONS_LEARNED.md reflects current state
- [ ] LICENSE file is present
- [ ] **PORTFOLIO.MD is complete and valid**
  - All required YAML fields are filled in
  - Character limits are respected (title ≤80, tagline ≤140, target_audience ≤120)
  - Tags count is 3-10 (recommend 5-7)
  - All URLs are valid and accessible
  - Sales content is business-focused and concise
  - Tech stack lists 5-12 items
  - Proof section has 0-3 bullets
  - YAML validates between BEGIN/END markers
- [ ] This checklist is complete ✓

---

## 🎯 12. Final Verification

### Pre-Deploy

- [ ] Run production build locally
  ```bash
  npm run build
  npm run start
  ```
- [ ] Test production build at `http://localhost:3000`
- [ ] Verify all functionality works in production mode
- [ ] Check bundle size is reasonable
- [ ] Review build output for warnings

### Post-Deploy

- [ ] Visit production URL and verify it loads
- [ ] Test both language versions on production
- [ ] Test audio player on production
- [ ] Test docs viewer on production
- [ ] Run Lighthouse on production URL
- [ ] Test on mobile device (real device, not just DevTools)
- [ ] Share with a friend/colleague for feedback

---

## ✅ Sign-Off

**Deployment Date:** **\*\*\*\***\_**\*\*\*\***

**Deployed By:** **\*\*\*\***\_**\*\*\*\***

**Version:** v2.1.0

**Notes:**

---

---

---

**All critical checks passed:** [ ] Yes [ ] No

**Known issues (if any):**

---

---

---

**Remember:** If you skip a check, document why. Intentional decisions are professional. Accidents are not.
