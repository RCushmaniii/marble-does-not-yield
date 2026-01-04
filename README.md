# The Marble Does Not Yield

A cinematic, single-page narrative experience built with Next.js 14, TypeScript, and Tailwind CSS.

## Architecture

This is a production-ready storytelling website with:

- **Next.js 14 App Router** (React Server Components)
- **TypeScript** throughout
- **Tailwind CSS** for styling
- **Custom markdown processing** with remark/rehype
- **Scroll-triggered animations** via IntersectionObserver
- **Responsive image handling** (desktop/mobile hero variants)
- **Accessibility-first** (prefers-reduced-motion, semantic HTML, WCAG contrast)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Verify Images

Ensure these images are in place:

**Story Images (Required):**

```
public/images/
  ├── main-header-desktop.jpg   (1920×1080+, landscape hero)
  ├── main-header-mobile.jpg    (1080×1920+, portrait hero)
  └── ending.jpg                (1920×1080+, final image)
```

**Social/Meta Images (Needed before deploy):**

```
public/images/
  └── og-image.jpg              (1200×630, social previews)
```

**Favicons (Needed before deploy):**

```
public/
  ├── favicon.ico               (32×32, legacy browsers)
  ├── favicon.svg               (scalable, modern browsers)
  └── apple-touch-icon.png      (180×180, iOS)
```

**See [ASSETS_NEEDED.md](./ASSETS_NEEDED.md) for detailed specifications and creation guidelines.**

### 3. Edit Story (Optional)

The story content is in:

```
content/story.md
```

**Important:** The prose is preserved word-for-word. To control image placement, use this token:

- `[[ENDING_IMAGE]]` — places ending.jpg at this point

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B: GitHub → Vercel

1. Push to GitHub:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [your-repo-url]
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects Next.js and deploys

No configuration needed—Vercel handles everything.

## File Structure

```
marble-does-not-yield/
├── app/
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Main page (Hero + StoryRenderer)
│   └── globals.css          # Global styles, typography, scrollbar
├── components/
│   ├── Hero.tsx             # Full-screen hero with title sequence animation
│   ├── StoryRenderer.tsx    # Markdown renderer with image injection
│   └── ScrollFadeImage.tsx  # IntersectionObserver-based scroll fade
├── content/
│   └── story.md             # Story content with image tokens
├── lib/
│   ├── md.ts                # Markdown loader and parser
│   └── motion.ts            # Centralized animation settings
├── public/
│   └── images/              # JPG image assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Design System

### Typography

- **Display font**: Fraunces (title, section breaks)
- **Body font**: Source Serif 4 (long-form reading)
- **Base size**: 18px mobile → 19px tablet → 20px desktop
- **Line height**: 1.75–1.8 for comfortable reading
- **Max width**: 72ch (optimal reading measure)

### Color Palette

```css
--void: #0d0d0d        (near-black background)
--parchment: #e8e6e1   (warm off-white text)
--ash: #6b6b6b         (muted accents, italics)
```

### Animation Philosophy

- **Hero title sequence**: Image smashes down from top, followed by staggered text reveals
- **Scroll-triggered images**: Fade-in via IntersectionObserver
- **Text content**: Fades in as user scrolls through the story
- **Ending image**: Constrained to reading width for intimacy
- **Reduced motion**: All animations disabled when `prefers-reduced-motion: reduce` is detected

## Accessibility Features

- **Semantic HTML**: `<main>`, `<article>`, `<section>`, proper heading hierarchy
- **High contrast**: WCAG AAA compliant text/background ratios
- **Focus states**: Visible outlines for keyboard navigation
- **Reduced motion**: Respects user preference, disables all animations
- **Alt text**: Intentionally empty for decorative images (per WCAG guidelines)
- **Responsive images**: Proper `sizes` attributes for performance

## Customization

### Adjusting Image Placement

Edit `content/story.md` and move the image token:

```markdown
Your story content...

[[ENDING_IMAGE]]

Optional content after the image...
```

### Changing Fonts

Edit `app/layout.tsx`:

```typescript
import { Your_Display_Font, Your_Body_Font } from "next/font/google";
```

Update `tailwind.config.ts` to use new variable names.

### Adjusting Animation Timing

Edit `lib/motion.ts`:

```typescript
export const motion = {
  hero: {
    title: {
      transition: {
        duration: 0.8, // Adjust this
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
    // ...
  },
  scrollFade: {
    duration: 1200, // Adjust this
  },
};
```

### Changing Color Palette

Edit `tailwind.config.ts`:

```typescript
colors: {
  void: "#0d0d0d",
  parchment: "#e8e6e1",
  ash: "#6b6b6b",
},
```

## Performance

- **Next.js Image Optimization**: Automatic WebP conversion, lazy loading
- **Priority Loading**: Hero images load immediately
- **Lazy Loading**: Below-fold images load on scroll
- **Code Splitting**: Automatic per-route splitting
- **Tree Shaking**: Unused code eliminated in production build

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome Android
- **Graceful degradation**: Works without JavaScript (static HTML/CSS)

## Troubleshooting

### Images not loading

- Verify images are in `public/images/` with exact filenames
- Check browser console for 404 errors
- Ensure images are JPG format (not JPEG, PNG, etc.)

### Story not rendering

- Verify `content/story.md` exists
- Check for syntax errors in markdown
- Review server console for parsing errors

### Animations not working

- Check if `prefers-reduced-motion` is enabled in browser settings
- Verify JavaScript is enabled
- Check browser console for errors

## License

This is a custom narrative project. All rights reserved.

---

**Production-ready. Deploy when you're ready.**
