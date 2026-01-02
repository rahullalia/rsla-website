# RSL/A Website (rsla.io)

Marketing & AI automation agency website. Rebrand of RSL Media Hub.

## Tech Stack

- **Next.js 16** (App Router) with Turbopack
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Sanity CMS** for blog content
- **Framer Motion** for animations
- **Vercel** for deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap (12 case studies + blog)
│   ├── work/              # 12 case study pages (SEO-optimized slugs)
│   ├── blog/              # Blog (Sanity-powered)
│   ├── privacy-policy/    # Privacy policy
│   ├── terms/             # Terms of service
│   ├── thank-you/         # Calendar booking confirmation
│   └── insider/           # Newsletter insider page
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation (Home/Work/Blog)
│   ├── Footer.tsx         # Footer with newsletter signup
│   ├── CaseStudyLayout.tsx # Case study template
│   ├── animations.tsx     # 22 animation components (desktop-only with mobile fallbacks)
│   ├── FadeIn.tsx         # Animation wrapper
│   └── FadeInStagger.tsx  # Staggered animations
└── sanity/
    └── lib/
        ├── client.ts      # Sanity client config
        └── image.ts       # Image URL builder

public/
├── images/                # Team photos, static assets
├── lockup-transparent.png # Main logo (nav + footer)
├── favicon.svg            # Vector favicon
├── favicon-16x16.png      # Favicon fallback
├── favicon-32x32.png      # Favicon fallback
├── apple-touch-icon.png   # iOS home screen (180×180)
├── safari-pinned-tab.svg  # Safari pinned tab
├── icon-192.png           # PWA icon
├── icon-512.png           # PWA icon
├── og-image.png           # Social sharing (1200×630)
├── manifest.json          # PWA metadata
├── robots.txt             # Crawler directives
└── llm.txt                # AI/LLM crawler information
```

## Sanity CMS

Blog content is managed via Sanity CMS.

- **Project ID:** `36wenybq`
- **Dataset:** `production`
- **API Version:** `2024-01-01`

## SEO & Mobile Optimization

**SEO Features:**
- Dynamic sitemap with all pages (homepage, 11 case studies, blog posts)
- robots.txt with crawl-delay and sitemap reference
- llm.txt for AI/LLM crawler information
- 17 targeted keywords in metadata
- Comprehensive Open Graph and Twitter Card configuration
- Structured favicon system (SVG + PNG fallbacks)

**Mobile Optimization:**
- Fully responsive design with mobile-first approach
- Viewport meta tag configured for optimal mobile experience
- Responsive logo sizing: h-16 (mobile) → h-20 (tablet) → h-24 (desktop)
- Reduced padding on mobile for better content density
- Content-first layout on mobile (case studies show content before stats)
- WCAG-compliant color contrast ratios

## ⚠️ iOS Safari Compatibility

**CRITICAL:** This project uses React 19 + Next.js 16, which has known issues with iOS Safari.

**DO NOT USE:**
- `next/image` component - Causes iOS Safari crashes
- `Image` from 'next/image' - Use native `<img>` tags instead
- Framer Motion animations on mobile - Use `useIsMobile()` hook

**Safe Pattern for Images:**
```tsx
// ❌ WRONG - Will crash iOS Safari
import Image from 'next/image';
<Image src="/logo.png" alt="Logo" width={100} height={100} />

// ✅ CORRECT - Use native img tag
<img src="/logo.png" alt="Logo" className="h-16 w-auto" />
```

**Safe Pattern for Animations:**
```tsx
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  return isMobile;
}

// Return static fallback on mobile
if (isMobile) return <div>{children}</div>;
return <motion.div ...>{children}</motion.div>;
```

See [CLAUDE.md](../CLAUDE.md) for full details on the iOS crash fix.

## Deployment

Auto-deploys to Vercel on push to `main` branch.

**Domain:** rsla.io

## Logo Builder

Interactive canvas-based tool for generating RSL/A logo assets with real-time preview and high-resolution export.

**Access:** [http://localhost:3000/logo-builder.html](http://localhost:3000/logo-builder.html)

### Logo Components

| Component | Description |
|-----------|-------------|
| **Logomark** | Blue square (#0070f3) with white parallelogram slash |
| **Wordmark** | "RSL" + blue parallelogram slash + "A" |
| **Full Lockup** | Logomark + Wordmark combined |

### Export Options

- **Formats:** PNG (up to 60x scale), SVG
- **Variants:** Full Lockup, Logomark only, Wordmark only
- **Options:** Transparent or solid background

### Brand Specifications

| Element | Value |
|---------|-------|
| Primary Color | `#0070f3` (Electric Blue) |
| Text Color | `#ffffff` (White) |
| Background | `#0a0a0a` (Black) |
| Font | Satoshi 900 |
| Tracking | -0.04em |

### Default Logo Settings

```javascript
{
    iconSize: 50,
    iconSlashWidth: 10,
    iconSlashSkew: -20,
    gap: 15,
    tracking: -0.04,
    slashAGap: -4,
    textSlashWidth: 10,
    textSlashSkew: -20,
    textSlashHeight: 75,
    fontSize: 50
}
```

## Admin Routes

**Note:** Authentication is currently disabled due to Vercel COOP issues blocking Firebase popup auth.

| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard |
| `/admin/blog` | Blog automation UI (Gemini-powered) |
| `/studio` | Sanity Studio (content management) |

See [CLAUDE.md](../CLAUDE.md) for details on re-enabling authentication.

## Documentation

See [CLAUDE.md](../CLAUDE.md) for detailed project documentation including:
- Design decisions
- Build issue fixes
- Progress log
- Integration details
- Admin authentication details
- Logo builder technical implementation
