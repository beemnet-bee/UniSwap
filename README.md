# UniSWAP — Campus Marketplace Landing Site

A multi-page marketing website for **UniSWAP**, a verified student marketplace for swapping, finding lost items, and giving stuff a second life on campus.

Built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS 4**, **shadcn/ui**, **Framer Motion**, and **Space Grotesk**.

## Pages (10 routes)

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
| `/admin/login` | Admin login (password gate) |
| `/admin` | Admin dashboard — stats, messages, settings |

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

## Admin Dashboard

The site includes a full admin dashboard at `/admin` for managing contact form submissions and team chat.

### Default credentials (3 admins)
| Username | Password | Email |
|----------|----------|-------|
| `admin1` | `admin1@uniswap` | admin1@uniswap.app |
| `admin2` | `admin2@uniswap` | admin2@uniswap.app |
| `admin3` | `admin3@uniswap` | admin3@uniswap.app |

- **Login URL:** `/admin/login` (requires username + password)
- Change your own password in **Settings** tab after login.

### Features
- **Dashboard tab:** Total views, total messages, unread count, replied count, views-by-page bar chart, recent messages list (shows which admin replied)
- **Messages tab:** Search/filter contact submissions, mark as read, write & save replies (tracks which admin replied), delete messages, open in email client
- **Team Chat tab:** Global chat for all 3 admins — messages appear in real-time (polling every 3s), each admin's messages are color-coded, delete your own messages
- **Settings tab:** Each admin changes their own email and password (per-admin, not shared)

### How it works
- Contact form submissions on `/partner` are saved to the database (no SMTP needed)
- Admin authenticates with username + password → httpOnly cookie (7-day expiry)
- Page views are tracked automatically via `/api/track` (excludes `/admin` and `/api` routes)
- All admin API endpoints require valid authentication
- Chat messages are visible to all 3 admins — any sent message or reply appears on all dashboards
- Each admin's settings (email, password) are their own — changing your password doesn't affect other admins

### Database setup
Uses SQLite via Prisma. On first run:
```bash
bun run db:push    # Create the schema
bun run seed       # Seed the 3 default admins
```
The database file is created at `db/custom.db`.

> **Vercel note:** SQLite uses the local filesystem, which is read-only on Vercel serverless functions. For production on Vercel, switch to a hosted database (PostgreSQL via Prisma, PlanetScale, or Vercel Postgres). Update `prisma/schema.prisma` `datasource db` provider and `DATABASE_URL` env var accordingly. For local development or self-hosting, SQLite works perfectly.

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
