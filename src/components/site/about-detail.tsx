'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Leaf, Target, Telescope, ArrowRight, Recycle, TrendingDown, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

const blocks = [
  {
    icon: Leaf,
    eyebrow: 'Our story',
    title: 'Two students. One dumpster too many.',
    body: 'UniSWAP was created by two college students who noticed unsustainable consumption trends on their campus — piles of perfectly good furniture, textbooks, and electronics hauled to the curb at the end of every semester. Together they built a technical solution to the root of this problem, while emphasizing student safety and experience along the way.',
    accent: 'blue' as const,
  },
  {
    icon: Target,
    eyebrow: 'Our mission',
    title: 'Make the second-hand choice the easy one.',
    body: 'Our mission is to provide a platform that makes it easier for students to choose second-hand exchange and more sustainable consumption practices. Swap instead of buy. Find instead of replace. Reuse instead of discard — without giving up convenience, safety, or your time.',
    accent: 'red' as const,
  },
  {
    icon: Telescope,
    eyebrow: 'Our vision',
    title: 'Circular consumption on every campus.',
    body: 'We envision circular consumption models established across college campuses worldwide — where reusing goods is the default, where move-out week no longer means a wave of waste, and where every campus is a self-sustaining loop of stuff moving from student to student instead of student to landfill.',
    accent: 'blue' as const,
  },
]

export function AboutDetail() {
  return (
    <>
      {/* Story / Mission / Vision — full width detail blocks */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {blocks.map((b, i) => (
              <motion.article
                key={b.eyebrow}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className={cn(
                  'group relative grid gap-6 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-[auto_1fr] lg:p-10',
                  i % 2 === 1 && 'lg:grid-cols-[1fr_auto]'
                )}
              >
                {/* gradient blob */}
                <div
                  className={cn(
                    'pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl opacity-60',
                    b.accent === 'blue' ? 'bg-primary/20' : 'bg-[#D84241]/20'
                  )}
                />
                {/* icon block */}
                <div
                  className={cn(
                    'relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl',
                    b.accent === 'blue'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-[#D84241]/15 text-[#D84241]'
                  )}
                >
                  <b.icon className="h-8 w-8" strokeWidth={1.75} />
                </div>
                <div className="relative">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {b.eyebrow}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {b.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {b.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* The problem we're solving */}
      <section className="relative overflow-hidden border-y border-border/60 bg-card/30 py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#D84241]/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
              The problem
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Move-out week is a{' '}
              <span className="uniswap-gradient-text">tsunami of waste.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Colleges generate up to 200+ tons of solid waste during move-out
              alone. Up to 70% of it is reusable — yet most of it ends up in a
              landfill. We are building the tool that catches it first.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {[
              { value: '70%', label: 'of dorm waste is reusable', icon: Recycle, accent: 'blue' as const },
              { value: '200+', label: 'tons per move-out (avg campus)', icon: TrendingDown, accent: 'red' as const },
              { value: '$2.4k', label: 'saved per swapping student', icon: Sparkles, accent: 'blue' as const },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-border bg-card p-7 text-center shadow-sm"
              >
                <div
                  className={cn(
                    'mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl',
                    s.accent === 'blue'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-[#D84241]/15 text-[#D84241]'
                  )}
                >
                  <s.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <p
                  className={cn(
                    'text-3xl font-bold sm:text-4xl',
                    s.accent === 'blue' ? 'text-primary' : 'text-[#D84241]'
                  )}
                >
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to impact */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] brand-gradient-surface p-8 text-white shadow-xl sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D84241]/30 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#67B0C3]/40 blur-[100px]" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                    See the numbers behind the mission.
                  </h2>
                  <p className="mt-4 max-w-md text-white/80">
                    8% adoption. 10,000 lbs diverted. 1.5 billion pounds of
                    global potential. Read the full impact breakdown.
                  </p>
                </div>
                <Link
                  href="/impact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground shadow-md transition-transform hover:scale-105"
                >
                  Explore our impact
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
