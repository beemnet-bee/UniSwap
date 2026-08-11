'use client'

import * as React from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'
import Link from 'next/link'
import { impactStats } from '@/lib/site-content'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'
import {
  TrendingDown,
  Leaf,
  Recycle,
  ArrowRight,
  Building2,
  Users,
  Tag,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react'

function parseLeadingNumber(s: string) {
  const match = s.match(/^([^0-9]*)([0-9,]+)(.*)$/)
  if (!match) return { value: 0, suffix: s, prefix: '' }
  const [, prefix, numStr, suffix] = match
  return { value: parseFloat(numStr.replace(/,/g, '')), suffix, prefix }
}

function CounterStat({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { value: target, suffix, prefix } = parseLeadingNumber(value)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    const isInt = Number.isInteger(target)
    const v = isInt ? Math.round(latest) : latest.toFixed(1)
    return `${prefix}${Number(v).toLocaleString()}${suffix}`
  })
  React.useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, { duration: 1.8, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, target, count])
  return <motion.span ref={ref} className={className}>{rounded}</motion.span>
}

export function ImpactDetail() {
  return (
    <>
      {/* Hero stat, the big number */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] brand-gradient-surface p-10 text-white shadow-xl sm:p-14 lg:p-20">
              <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#D84241]/30 blur-[120px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#67B0C3]/40 blur-[120px]" />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              <div className="relative text-center">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
                  <Leaf className="h-3.5 w-3.5" /> The headline number
                </p>
                <div className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                  <CounterStat value="10,000 lbs" />
                </div>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
                  Diverted from landfill every year at a single campus, with
                  just 8% student adoption. That is the conservative estimate
                  at CWRU alone.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats grid */}
      <section className="relative py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              The full{' '}
              <span className="uniswap-gradient-text">breakdown.</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Conservative projections based on student move-out waste
              estimates. Real numbers, tracked from real swaps once the app
              launches.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className={cn(
                    'pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100',
                    i % 2 === 0 ? 'bg-primary/25' : 'bg-[#D84241]/25'
                  )}
                />
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-2xl',
                      i % 2 === 0
                        ? 'bg-primary/15 text-primary'
                        : 'bg-[#D84241]/15 text-[#D84241]'
                    )}
                  >
                    <stat.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/50">
                    0{i + 1}
                  </span>
                </div>
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <CounterStat value={stat.value} />
                </div>
                <p className="mt-2 text-sm font-semibold">{stat.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {stat.caption}
                </p>
                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                    className={cn(
                      'h-full origin-left rounded-full',
                      i % 2 === 0
                        ? 'bg-gradient-to-r from-primary to-[#67B0C3]'
                        : 'bg-gradient-to-r from-[#D84241] to-[#67B0C3]'
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why reducing waste matters, 3 pillars */}
      <section className="relative border-y border-border/60 bg-card/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
              Why it matters
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Three reasons{' '}
              <span className="uniswap-gradient-text">reducing waste matters.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: TrendingDown,
                title: 'Why reducing waste matters',
                body: 'Landfills are not infinite. Every pound diverted is a pound that does not decompose into methane, does not leach into groundwater, and does not take up space your city does not have. Reduction beats recycling every time.',
                accent: 'blue' as const,
              },
              {
                icon: Building2,
                title: 'Campus sustainability',
                body: 'Universities have their own sustainability goals, AASHE STARS ratings, climate pledges, zero-waste initiatives. UniSWAP gives your sustainability office real, auditable diversion numbers to report.',
                accent: 'red' as const,
              },
              {
                icon: HeartHandshake,
                title: 'Helping students save money',
                body: 'The average student spends $2,400+ per year on textbooks, furniture, and electronics. Reusing on campus keeps that money in students\' pockets, and keeps usable goods out of the landfill.',
                accent: 'blue' as const,
              },
            ].map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className={cn(
                    'pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-60',
                    p.accent === 'blue' ? 'bg-primary/20' : 'bg-[#D84241]/20'
                  )}
                />
                <div
                  className={cn(
                    'relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110',
                    p.accent === 'blue'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-[#D84241]/15 text-[#D84241]'
                  )}
                >
                  <p.icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="relative text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Global potential, the 1.5B lbs story */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-8 rounded-[2.5rem] border border-border bg-card p-8 shadow-sm sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  Global potential
                </p>
                <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  If 25% of students at{' '}
                  <span className="uniswap-gradient-text">50,000+ universities</span>{' '}
                  adopted UniSWAP…
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  The potential global diversion impact could exceed 1.5
                  billion pounds of usable goods per year. That is real
                  tonnage, moved out of the waste stream and back into use,
                  campus by campus.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-[#D84241]/20 blur-2xl" />
                <div className="relative rounded-3xl brand-gradient-surface p-8 text-center text-white shadow-lg">
                  <div className="text-5xl font-bold tracking-tight sm:text-6xl">
                    <CounterStat value="1.5B lbs" />
                  </div>
                  <p className="mt-3 text-sm text-white/80">
                    Annual global diversion potential
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    {[
                      { v: '50k+', l: 'universities' },
                      { v: '25%', l: 'adoption' },
                      { v: '1.5B', l: 'lbs/year' },
                    ].map((s) => (
                      <div key={s.l} className="rounded-2xl bg-white/10 p-3">
                        <p className="text-lg font-bold">{s.v}</p>
                        <p className="text-[10px] text-white/70">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <Recycle className="h-3 w-3" />
            Statistics are theoretical projections based on conservative
            move-out waste estimates until app launch.
          </Reveal>
        </div>
      </section>

      {/* CTA to partner */}
      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-card p-7 shadow-sm sm:flex-row sm:p-8">
              <div>
                <h3 className="text-lg font-bold">Want these numbers on your campus?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us about your institution. We will send a tailored impact
                  projection within 2 business days.
                </p>
              </div>
              <Link
                href="/partner"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#D84241] px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                Get a projection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
