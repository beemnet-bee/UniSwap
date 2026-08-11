'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { steps } from '@/lib/site-content'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#D84241]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
            How it works
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Four steps from sign-up to{' '}
            <span className="uniswap-gradient-text">swap complete.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            No lengthy onboarding. No friction. Verify, post, chat, swap, most
            students finish their first swap in under a day.
          </p>
        </Reveal>

        {/* Steps with connecting line */}
        <div className="relative mt-20">
          {/* desktop horizontal line, blue→red gradient */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
            aria-hidden
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* number badge */}
                <div className="relative z-10 mb-6 flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      'relative grid h-14 w-14 place-items-center rounded-2xl border bg-card shadow-sm',
                      i % 2 === 0
                        ? 'border-primary/30 text-primary'
                        : 'border-[#D84241]/30 text-[#D84241]'
                    )}
                  >
                    <s.icon className="h-6 w-6" strokeWidth={1.75} />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-[10px] font-bold text-white">
                      {s.num}
                    </span>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <ArrowRight
                      className="hidden h-5 w-5 text-muted-foreground/50 lg:block"
                      aria-hidden
                    />
                  )}
                </div>

                <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
