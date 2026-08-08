'use client'

import { motion } from 'framer-motion'
import { team } from '@/lib/site-content'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden border-y border-border/60 bg-card/30 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-[#D84241]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Our Team
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built by students,{' '}
            <span className="uniswap-gradient-text">for students.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            We are a small team of students who got tired of watching perfectly
            good stuff end up in dumpsters. UniSWAP is our answer.
          </p>
        </Reveal>

        <StaggerGroup
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                {/* hover gradient blob */}
                <div
                  className={cn(
                    'pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100',
                    m.accent === 'blue' ? 'bg-primary/20' : 'bg-[#D84241]/20'
                  )}
                />
                {/* avatar */}
                <div className="relative mb-5 flex items-center justify-between">
                  <div
                    className={cn(
                      'grid h-16 w-16 place-items-center rounded-2xl text-lg font-bold text-white shadow-md',
                      m.accent === 'blue'
                        ? 'bg-gradient-to-br from-primary to-[#1B5F7A]'
                        : 'bg-gradient-to-br from-[#D84241] to-[#6B1F1F]'
                    )}
                  >
                    {m.initials}
                  </div>
                  <span
                    className={cn(
                      'grid h-9 w-9 place-items-center rounded-full',
                      m.accent === 'blue'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-[#D84241]/15 text-[#D84241]'
                    )}
                  >
                    <m.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
                <p
                  className={cn(
                    'mt-0.5 text-sm font-medium',
                    m.accent === 'blue' ? 'text-primary' : 'text-[#D84241]'
                  )}
                >
                  {m.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>

                {/* social placeholder row */}
                <div className="mt-4 flex items-center gap-2 opacity-60 transition-opacity group-hover:opacity-100">
                  {['in', '✉', '@'].map((s, i) => (
                    <span
                      key={i}
                      className="grid h-7 w-7 place-items-center rounded-full border border-border bg-background text-[10px] font-medium text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* join us banner */}
        <Reveal delay={0.2} className="mt-12">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-dashed border-border bg-card/50 p-6 sm:flex-row sm:p-8">
            <div>
              <h3 className="text-lg font-bold">Want to bring UniSWAP to your campus?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We are recruiting student ambassadors at pilot schools. Get
                early access, swag, and a real say in the product.
              </p>
            </div>
            <a
              href="#partner"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#D84241] px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              Become an ambassador
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
