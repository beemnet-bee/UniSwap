'use client'

import { motion } from 'framer-motion'
import { features } from '@/lib/site-content'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'
import { BadgeCheck, Search, BellRing, MapPin, Repeat2, Tag, ShieldCheck, MessagesSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Features() {
  return (
    <section
      id="features"
      className="relative border-y border-border/40 bg-background py-24 lg:py-32"
    >
      {/* lighter background per Creation.pdf, subtle dotted grid only */}
      <div className="pointer-events-none absolute inset-0 uniswap-grid-bg opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
            Features
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything a student needs to{' '}
            <span className="uniswap-gradient-text">swap smarter.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            From .edu verification to Lost & Found, UniSWAP ships with the
            tools students actually use, not a bolted-on checklist of
            half-baked ideas.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left: features grid */}
          <StaggerGroup
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7"
            stagger={0.07}
          >
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  {/* hover gradient overlay */}
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
                  <h3 className="relative text-base font-bold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                  {/* accent bar */}
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

          {/* Right: second phone mockup, spread throughout per Creation.pdf */}
          <Reveal delay={0.2} className="lg:col-span-5">
            <FeaturePhone />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* A second, smaller phone mockup showing the Lost & Found + Notifications */
function FeaturePhone() {
  return (
    <div className="relative mx-auto flex max-w-sm items-center justify-center py-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/25 to-[#D84241]/25 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
        className="relative z-10"
      >
        <div className="relative h-[28rem] w-[14.5rem] rounded-[2.25rem] border-[6px] border-foreground/90 bg-foreground p-1.5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="absolute left-1/2 top-1.5 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground dark:bg-zinc-900" />
          <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-white to-[#F7F8F8] dark:from-[#131A1D] dark:to-[#0F1416]">
            {/* status bar */}
            <div className="flex items-center justify-between px-4 pt-3 text-[9px] font-medium text-foreground/70">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-foreground/60" />
                <span className="h-1 w-2.5 rounded-sm bg-foreground/60" />
              </span>
            </div>

            {/* header */}
            <div className="px-4 pt-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Notifications
              </p>
              <p className="text-sm font-bold">Today</p>
            </div>

            {/* notification list */}
            <div className="mt-3 space-y-2 px-3">
              {[
                {
                  icon: BellRing,
                  title: 'Price drop!',
                  body: 'Mini Fridge now $25',
                  color: 'red',
                },
                {
                  icon: MapPin,
                  title: 'Lost & Found match',
                  body: 'Your ID was found!',
                  color: 'blue',
                },
                {
                  icon: MessagesSquare,
                  title: 'New message',
                  body: 'Is the lamp available?',
                  color: 'blue',
                },
                {
                  icon: Repeat2,
                  title: 'Swap request',
                  body: 'Backpack ↔ Earbuds',
                  color: 'red',
                },
              ].map((n, i) => (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
                  className="flex items-start gap-2 rounded-xl bg-white p-2 shadow-sm dark:bg-white/5"
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                      n.color === 'blue'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-[#D84241]/15 text-[#D84241]'
                    }`}
                  >
                    <n.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="text-[10px] leading-tight">
                    <p className="font-semibold">{n.title}</p>
                    <p className="text-muted-foreground">{n.body}</p>
                  </div>
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D84241]" />
                </motion.div>
              ))}
            </div>

            {/* bottom CTA */}
            <div className="absolute inset-x-3 bottom-3">
              <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary to-[#D84241] px-3 py-2 text-white">
                <span className="text-[10px] font-semibold">View all activity</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
