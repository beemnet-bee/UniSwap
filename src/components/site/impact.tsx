'use client'

import * as React from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'
import { impactStats } from '@/lib/site-content'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'
import { TrendingDown, Leaf, Recycle, ArrowDownRight } from 'lucide-react'

/* Parse the leading numeric portion out of strings like "10,000 lbs" or "$2,400+" */
function parseLeadingNumber(s: string): { value: number; suffix: string; prefix: string } {
  const match = s.match(/^([^0-9]*)([0-9,]+)(.*)$/)
  if (!match) return { value: 0, suffix: s, prefix: '' }
  const [, prefix, numStr, suffix] = match
  return {
    value: parseFloat(numStr.replace(/,/g, '')),
    suffix,
    prefix,
  }
}

function CounterStat({
  value,
  className,
  duration = 1.8,
}: {
  value: string
  className?: string
  duration?: number
}) {
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
    const controls = animate(count, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [inView, target, count, duration])

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  )
}

export function Impact() {
  return (
    <section
      id="impact"
      className="relative overflow-hidden brand-gradient-surface py-28 text-white lg:py-36"
    >
      {/* decorative overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-[40rem] rounded-full bg-[#2B8FB9]/40 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#D84241]/40 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
            <Leaf className="h-3.5 w-3.5" />
            Our Impact
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Small adoption.{' '}
            <span className="bg-gradient-to-r from-[#67B0C3] via-white to-[#D84241] bg-clip-text text-transparent">
              Real tonnage.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
            Reducing campus waste is not abstract for us. We track every swap
            and surface the diversion numbers back to your sustainability office
           , so the impact is measurable, not theoretical.
          </p>
        </Reveal>

        {/* Big stats, bigger fonts per Creation.pdf */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors hover:bg-white/[0.12]"
            >
              {/* number badge */}
              <div className="mb-5 flex items-center justify-between">
                <div
                  className={cn(
                    'inline-flex h-12 w-12 items-center justify-center rounded-2xl',
                    i % 2 === 0
                      ? 'bg-[#67B0C3]/25 text-[#9DC8D5]'
                      : 'bg-[#D84241]/25 text-[#FF8B8A]'
                  )}
                >
                  <stat.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono text-white/40">
                  0{i + 1}
                </span>
              </div>
              <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                <CounterStat value={stat.value} />
              </div>
              <p className="mt-2 text-sm font-semibold text-white/90">
                {stat.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                {stat.caption}
              </p>

              {/* hover accent bar */}
              <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'h-full origin-left rounded-full',
                    i % 2 === 0
                      ? 'bg-gradient-to-r from-[#2B8FB9] to-[#67B0C3]'
                      : 'bg-gradient-to-r from-[#D84241] to-[#67B0C3]'
                  )}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* infographic, why reducing waste matters */}
        <Reveal delay={0.2} className="mt-12">
          <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-1">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9DC8D5]">
                <TrendingDown className="h-3.5 w-3.5" /> Why it matters
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                Move-out week is a tsunami of waste.
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Colleges generate up to 200+ tons of solid waste during
                move-out alone. Most of it is reusable.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 lg:col-span-2">
              {[
                { label: 'of dorm waste is reusable', value: '70%', color: 'blue' },
                { label: 'tons per move-out (avg campus)', value: '200+', color: 'red' },
                { label: 'saved per swapping student', value: '$2.4k', color: 'blue' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="rounded-2xl bg-white/[0.06] p-4 text-center"
                >
                  <p
                    className={cn(
                      'text-2xl font-bold sm:text-3xl',
                      s.color === 'blue' ? 'text-[#9DC8D5]' : 'text-[#FF8B8A]'
                    )}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-white/70">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.3}
          className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-white/50"
        >
          <Recycle className="h-3 w-3" />
          Statistics are theoretical projections based on conservative
          move-out waste estimates until app launch.
        </Reveal>
      </div>
    </section>
  )
}
