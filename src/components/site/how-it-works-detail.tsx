'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { steps } from '@/lib/site-content'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'
import { ArrowRight, GraduationCap, Search, MessagesSquare, HandHeart } from 'lucide-react'

export function HowItWorksDetail() {
  return (
    <>
      {/* Steps, alternating left/right (zigzag) timeline */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* vertical center line on desktop, left line on mobile */}
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary via-[#67B0C3] to-[#D84241] lg:left-1/2 lg:-translate-x-1/2" />

            <div className="space-y-12 lg:space-y-16">
              {steps.map((s, i) => {
                // Alternate: even = left side, odd = right side
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      'relative pl-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:pl-0',
                    )}
                  >
                    {/* number badge on the line, centered on desktop */}
                    <div className="absolute left-0 top-0 z-10 lg:left-1/2 lg:-translate-x-1/2">
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className={cn(
                          'relative grid h-16 w-16 place-items-center rounded-2xl border-2 border-background bg-gradient-to-br text-white shadow-lg',
                          isLeft
                            ? 'from-primary to-[#1B5F7A]'
                            : 'from-[#D84241] to-[#6B1F1F]'
                        )}
                      >
                        <s.icon className="h-7 w-7" strokeWidth={1.75} />
                        <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">
                          {s.num}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content card, alternates left/right on desktop */}
                    {isLeft ? (
                      <>
                        {/* Left content, empty right */}
                        <div className="lg:pr-12 lg:text-right">
                          <StepCard step={s} index={i} align="right" />
                        </div>
                        <div className="hidden lg:block" />
                      </>
                    ) : (
                      <>
                        {/* Empty left, right content */}
                        <div className="hidden lg:block" />
                        <div className="lg:pl-12">
                          <StepCard step={s} index={i} align="left" />
                        </div>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What you need checklist */}
      <section className="relative border-y border-border/60 bg-card/30 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
              Before you start
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              What you need to{' '}
              <span className="uniswap-gradient-text">get swapping.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {[
              { icon: GraduationCap, title: 'A current .edu email', body: 'Your university email is your ticket in. We confirm it is active and tied to a current student record before you can post or message.' },
              { icon: Search, title: 'A photo of your item', body: 'One clear photo is enough to list. Add a condition note and a category, most listings take under 30 seconds to create.' },
              { icon: MessagesSquare, title: 'A meetup spot on campus', body: 'Pick a public spot, library, student center, dining hall. We recommend on-campus meetups for everyone\'s safety.' },
              { icon: HandHeart, title: 'An open mind', body: 'You do not have to buy. You can swap. Trade a lamp for a textbook, a kettle for a bike lock. Money is optional on UniSWAP.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <div
                  className={cn(
                    'grid h-12 w-12 shrink-0 place-items-center rounded-2xl',
                    i % 2 === 0
                      ? 'bg-primary/15 text-primary'
                      : 'bg-[#D84241]/15 text-[#D84241]'
                  )}
                >
                  <item.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-card p-7 shadow-sm sm:flex-row sm:p-8">
              <div>
                <h3 className="text-lg font-bold">Ready to start swapping?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Bring UniSWAP to your campus and your students can be swapping in 4 weeks.
                </p>
              </div>
              <Link
                href="/partner"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#D84241] px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                Bring UniSWAP to campus
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* Step card sub-component with align-aware styling */
function StepCard({
  step,
  index,
  align,
}: {
  step: typeof steps[number]
  index: number
  align: 'left' | 'right'
}) {
  const isBlue = index % 2 === 0
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative inline-block w-full rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-xl sm:p-8"
    >
      {/* hover gradient blob */}
      <div
        className={cn(
          'pointer-events-none absolute -top-10 h-32 w-32 rounded-full opacity-50 blur-2xl transition-opacity group-hover:opacity-100',
          isBlue ? 'bg-primary/20' : 'bg-[#D84241]/20',
          align === 'right' ? 'right-0' : 'left-0'
        )}
      />
      <p
        className={cn(
          'mb-2 text-xs font-semibold uppercase tracking-[0.18em]',
          isBlue ? 'text-primary' : 'text-[#D84241]'
        )}
      >
        Step {step.num}
      </p>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {step.title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {step.description}
      </p>

      {/* connector dot showing the link to the line */}
      <div
        className={cn(
          'absolute top-8 hidden h-3 w-3 rounded-full border-2 border-background lg:block',
          isBlue ? 'bg-primary' : 'bg-[#D84241]',
          align === 'right'
            ? '-right-12 translate-x-1/2'
            : '-left-12 -translate-x-1/2'
        )}
      />
    </motion.div>
  )
}
