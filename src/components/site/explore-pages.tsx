'use client'

import { Reveal } from '@/components/motion-primitives'
import { PageCtaCard, type PageCta } from '@/components/site/page-cta-card'
import {
  Leaf,
  Sparkles,
  Building2,
  ListChecks,
  Users,
  HelpCircle,
  Megaphone,
} from 'lucide-react'

const ctas: PageCta[] = [
  {
    href: '/about',
    title: 'About UniSWAP',
    description:
      'Read our story, mission, and vision — why two students decided campus waste was a solvable problem.',
    icon: Leaf,
    accent: 'blue',
    cta: 'Read our story',
  },
  {
    href: '/features',
    title: 'Features',
    description:
      'Verified .edu accounts, real-time messaging, SwapShop, Lost & Found, and more — everything students actually use.',
    icon: Sparkles,
    accent: 'red',
    cta: 'See the features',
  },
  {
    href: '/impact',
    title: 'Our Impact',
    description:
      'See the numbers: how 8% adoption diverts 10,000 lbs per campus, and what that means globally.',
    icon: Building2,
    accent: 'blue',
    cta: 'See the stats',
  },
  {
    href: '/how-it-works',
    title: 'How It Works',
    description:
      'Four steps from sign-up to swap complete. Verify, browse, chat, meet up — most students swap in a day.',
    icon: ListChecks,
    accent: 'red',
    cta: 'See the steps',
  },
  {
    href: '/team',
    title: 'Our Team',
    description:
      'Meet the students building UniSWAP — and learn how to join as a campus ambassador.',
    icon: Users,
    accent: 'blue',
    cta: 'Meet the team',
  },
  {
    href: '/faq',
    title: 'FAQ',
    description:
      'Common questions from campus admins: verification, safety, pricing, sustainability reporting.',
    icon: HelpCircle,
    accent: 'red',
    cta: 'Read the FAQ',
  },
  {
    href: '/partner',
    title: 'Partner With Us',
    description:
      'Bring UniSWAP to your campus. Tell us about your institution and get a tailored proposal.',
    icon: Megaphone,
    accent: 'blue',
    cta: 'Get a proposal',
  },
]

export function ExplorePages() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
            Explore
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Dive deeper into{' '}
            <span className="uniswap-gradient-text">UniSWAP.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Each section has its own page with the full story, numbers, and
            next steps. Pick what matters most to you.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ctas.map((cta, i) => (
            <PageCtaCard key={cta.href} cta={cta} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
