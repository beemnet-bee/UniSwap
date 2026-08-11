'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { features } from '@/lib/site-content'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'
import {
  BadgeCheck,
  Search,
  BellRing,
  MapPin,
  Repeat2,
  Tag,
  ShieldCheck,
  MessagesSquare,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'

export function FeaturesDetail() {
  return (
    <>
      {/* Features grid */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div
                    className={cn(
                      'pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100',
                      f.accent === 'blue' ? 'bg-primary/25' : 'bg-[#D84241]/25'
                    )}
                  />
                  <div
                    className={cn(
                      'relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110',
                      f.accent === 'blue'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-[#D84241]/15 text-[#D84241]'
                    )}
                  >
                    <f.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="relative text-lg font-bold tracking-tight">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                  <div
                    className={cn(
                      'mt-4 h-0.5 w-10 origin-left scale-x-100 transition-all duration-300 group-hover:w-full',
                      f.accent === 'blue'
                        ? 'bg-gradient-to-r from-primary to-transparent'
                        : 'bg-gradient-to-r from-[#D84241] to-transparent'
                    )}
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Comparison table */}
      <section className="relative border-y border-border/60 bg-card/30 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
              Compared
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Why UniSWAP beats{' '}
              <span className="uniswap-gradient-text">generic marketplaces.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="grid grid-cols-3 border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <div className="p-4">Capability</div>
                <div className="p-4 text-center">UniSWAP</div>
                <div className="p-4 text-center">Facebook / Depop</div>
              </div>
              {[
                { label: 'Verified .edu students only', us: true, them: false },
                { label: 'Lost & Found board', us: true, them: false },
                { label: 'Swap (no money required)', us: true, them: false },
                { label: 'On-campus meetups norm', us: true, them: false },
                { label: 'Diversion dashboard for admins', us: true, them: false },
                { label: 'Real-time messaging', us: true, them: true },
                { label: 'Search & filtering', us: true, them: true },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={cn(
                    'grid grid-cols-3 items-center text-sm',
                    i % 2 === 1 && 'bg-muted/20'
                  )}
                >
                  <div className="p-4 font-medium">{row.label}</div>
                  <div className="p-4 text-center">
                    {row.us ? (
                      <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                    ) : (
                      <span className="text-muted-foreground">.</span>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    {row.them ? (
                      <CheckCircle2 className="mx-auto h-5 w-5 text-muted-foreground" />
                    ) : (
                      <span className="text-muted-foreground">.</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA to partner */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] brand-gradient-surface p-8 text-white shadow-xl sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D84241]/30 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#67B0C3]/40 blur-[100px]" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                    Want these features on your campus?
                  </h2>
                  <p className="mt-4 max-w-md text-white/80">
                    Bring UniSWAP to your students. We handle setup, branding,
                    and launch in under four weeks.
                  </p>
                </div>
                <Link
                  href="/partner"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground shadow-md transition-transform hover:scale-105"
                >
                  Get a proposal
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
