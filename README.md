# UniSWAP — Campus Marketplace Landing Site

A multi-page marketing website for **UniSWAP**, a verified student marketplace for swapping, finding lost items, and giving stuff a second life on campus.

Built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS 4**, **shadcn/ui**, **Framer Motion**, and **Space Grotesk**.

## Pages (8 routes)

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, school marquee, testimonials, explore grid |
| `/about` | Our Story, Mission, Vision + problem stats |
| `/features` | 8 feature cards + comparison table |
| `/impact` | 10,000 lbs hero stat + 4-stat grid + 3-pillar "why it matters" |
| `/how-it-works` | 4-step vertical timeline + "before you start" checklist |
| `/team` | 3 team members (Suong Tran, Suneha Shelke, Nikhil Shelke) + open roles |
| `/faq` | 6-question accordion + contact options |
| `/partner` | Proposal form (7 fields) + benefits + 4-week rollout timeline |

## Getting Started

```bash
# Install dependencies
bun install   # or: npm install

# Run the dev server
bun run dev   # or: npm run dev

# Open http://localhost:3000
```

## Deploying to Vercel

This project is configured for Vercel out of the box:

1. Push your code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no extra config needed
4. Click **Deploy**

**Build command:** `next build` (already set in `package.json`)  
**Output directory:** `.next` (handled automatically by Vercel)

> **Note:** Do NOT use `output: "standalone"` in `next.config.ts` when deploying to Vercel. Vercel handles the output natively. The standalone mode is only for self-hosting (Docker/Node server).

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui (New York style)
- **Animations**: Framer Motion
- **Fonts**: Space Grotesk (via `next/font/google`)
- **Icons**: lucide-react
- **Theme**: next-themes (light/dark mode)

## Brand Palette

| Color | Hex |
|-------|-----|
| Light Gray | `#F7F8F8` |
| Blue | `#2B8FB9` |
| Light Blue | `#67B0C3` |
| Red | `#D84241` |
| Black | `#000000` |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, theme, splash screen
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind + brand palette + utilities
│   ├── about/page.tsx
│   ├── features/page.tsx
│   ├── impact/page.tsx
│   ├── how-it-works/page.tsx
│   ├── team/page.tsx
│   ├── faq/page.tsx
│   └── partner/page.tsx
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── site/               # Site-specific components
│   │   ├── navbar.tsx              # Floating pill nav with scroll progress
│   │   ├── hero.tsx                # Hero with cycling phone mockup
│   │   ├── splash-screen.tsx       # Animated splash
│   │   ├── page-header.tsx         # Shared sub-page header
│   │   ├── page-cta-card.tsx       # CTA card for Explore grid
│   │   ├── explore-pages.tsx       # Home: grid linking to sub-pages
│   │   ├── school-marquee.tsx
│   │   ├── testimonials.tsx
│   │   ├── footer.tsx
│   │   ├── about-detail.tsx
│   │   ├── features-detail.tsx
│   │   ├── impact-detail.tsx
│   │   ├── how-it-works-detail.tsx
│   │   ├── team-detail.tsx
│   │   ├── faq-detail.tsx
│   │   ├── partner-detail.tsx
│   │   └── motion-primitives.tsx   # Reveal, StaggerGroup, StaggerItem
│   └── theme-provider.tsx
├── hooks/
│   ├── use-toast.ts
│   └── use-mobile.ts
└── lib/
    ├── utils.ts            # cn() helper
    └── site-content.ts     # All content data (features, steps, stats, etc.)
```

## Notes

- The team page uses placeholder co-founder cards (the PDF says "created by 2 college students" but doesn't name them).
- Pilot school names in the marquee are placeholders.
- The partner form currently shows a success toast — wire it to an email service (Resend, Postmark) for production.
- Statistics are theoretical projections per the PDF brief until the app launches.

© UniSWAP. Built by students, for students.
