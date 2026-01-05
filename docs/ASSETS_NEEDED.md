# ASSETS NEEDED

**File:** `docs/ASSETS_NEEDED.md`  
**Purpose:** Specification of required assets and file formats for deployment

---

## Required Assets

Before deploying, you need to create and add these assets to the `public/` directory.

---

## 1. Open Graph Image (High Priority)

**File:** `public/images/og-image.jpg`
**Dimensions:** 1200×630 pixels
**Format:** JPG or PNG

**Purpose:**

- Social media previews (Slack, Twitter, WhatsApp, iMessage)
- LinkedIn shares
- First impression when link is shared

**Design Guidelines:**

- Use hero image or a cropped/edited derivative
- Dark, restrained aesthetic (match site tone)
- Minimal or no text overlay
- Should be recognizable at thumbnail size
- High contrast for legibility

**Recommendation:**
Crop `main-header-desktop.jpg` to 1200×630, apply subtle vignette, optionally add title in restrained serif.

---

## 2. Favicon (Medium Priority)

**Files needed:**

```
public/
  ├── favicon.ico       (32×32, for legacy browsers)
  ├── favicon.svg       (scalable, modern browsers)
  └── apple-touch-icon.png (180×180, iOS)
```

**Purpose:**

- Browser tabs
- Bookmarks
- Mobile home screen icons
- Professional polish

**Design Guidelines:**

- Simple, monochrome or dark theme
- Readable at 16×16 pixels
- Consider abstract symbol related to marble/stone
- No complex imagery (won't be visible)

**Quick Option:**

- Single letter "M" in serif (Fraunces font)
- Dark background, light letter
- Export as SVG for sharpness

---

## 3. Canonical URL (Already Added)

Current setting:

```typescript
canonical: "https://marble-does-not-yield.vercel.app";
```

**After deployment:**

1. Note your actual Vercel URL
2. If using custom domain, update to that
3. Update `app/layout.tsx` line 42

---

## Optional: Security & Production Headers

If deploying to Vercel, create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

This is optional—Vercel has decent defaults.

---

## Quick Asset Checklist

Before deploying:

- [ ] Create `og-image.jpg` (1200×630)
- [ ] Create `favicon.ico` (32×32)
- [ ] Create `favicon.svg` (scalable)
- [ ] Create `apple-touch-icon.png` (180×180)
- [ ] Update canonical URL after first deploy

After first deploy:

- [ ] Test OG preview in Slack
- [ ] Test OG preview in Twitter Card Validator
- [ ] Verify favicon appears in browser tab
- [ ] Update canonical URL if using custom domain

---

## Tools for Asset Creation

**OG Image:**

- Figma (export at 2x resolution)
- Photoshop (crop + export)
- [og-playground.vercel.app](https://og-playground.vercel.app) (dynamic generation)

**Favicons:**

- [realfavicongenerator.net](https://realfavicongenerator.net)
- Figma → Export as PNG/SVG
- [favicon.io](https://favicon.io)

---

**Current Status:**

- ✅ Metadata configured (Twitter, OG, canonical, robots)
- ✅ `lang="en"` attribute set
- ⚠️ Image assets pending (create before deploy)
