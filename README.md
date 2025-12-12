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
│   ├── work/              # 11 case study pages
│   ├── blog/              # Blog (Sanity-powered)
│   ├── about/             # About page
│   ├── privacy-policy/    # Privacy policy
│   ├── terms/             # Terms of service
│   └── insider/           # Newsletter insider page
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation (Home/Work/Blog)
│   ├── Footer.tsx         # Footer with newsletter signup
│   ├── CaseStudyLayout.tsx # Case study template
│   ├── FadeIn.tsx         # Animation wrapper
│   └── FadeInStagger.tsx  # Staggered animations
└── sanity/
    └── lib/
        ├── client.ts      # Sanity client config
        └── image.ts       # Image URL builder
```

## Sanity CMS

Blog content is managed via Sanity CMS.

- **Project ID:** `36wenybq`
- **Dataset:** `production`
- **API Version:** `2024-01-01`

## Deployment

Auto-deploys to Vercel on push to `main` branch.

## Documentation

See [CLAUDE.md](../CLAUDE.md) for detailed project documentation including:
- Design decisions
- Build issue fixes
- Progress log
- Integration details
