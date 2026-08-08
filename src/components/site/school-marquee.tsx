'use client'

import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight } from 'lucide-react'

const schools = [
  'Case Western Reserve',
  'Ohio State University',
  'University of Michigan',
  'Carnegie Mellon',
  'Boston University',
  'NYU',
  'University of Pittsburgh',
  'Vanderbilt',
]

export function SchoolMarquee() {
  return (
    <section className="relative border-y border-border/60 bg-card/40 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Built with students from campuses across the country
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-10"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...schools, ...schools].map((s, i) => (
              <div
                key={`${s}-${i}`}
                className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-md ${
                    i % 2 === 0
                      ? 'bg-primary/15 text-primary'
                      : 'bg-[#D84241]/15 text-[#D84241]'
                  }`}
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                </span>
                <span>{s}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground/30" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
