'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '@/lib/site-content'
import { Reveal } from '@/components/motion-primitives'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 6500

export function Testimonials() {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [dir, setDir] = React.useState<1 | -1>(1)
  const count = testimonials.length

  const go = React.useCallback(
    (d: 1 | -1) => {
      setDir(d)
      setIndex((i) => (i + d + count) % count)
    },
    [count]
  )

  React.useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % count)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, count])

  const active = testimonials[index]

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-72 w-72 rounded-full bg-[#D84241]/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
            Community
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            What students are{' '}
            <span className="uniswap-gradient-text">saying.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Real feedback from the dorms, libraries, and group chats of the
            students already swapping on UniSWAP pilot campuses.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Big quote card */}
          <div className="relative mx-auto max-w-3xl">
            <Quote className="pointer-events-none absolute -left-2 -top-6 h-16 w-16 text-primary/15 sm:-left-8 sm:-top-8" />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10"
              >
                <div className="mb-5 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="text-balance text-xl font-medium leading-relaxed tracking-tight sm:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-sm font-bold text-white">
                    {active.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{active.name}</p>
                    <p className="text-xs text-muted-foreground">{active.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDir(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className="group relative p-1"
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-all',
                      i === index
                        ? 'w-8 bg-gradient-to-r from-primary to-[#D84241]'
                        : 'w-1.5 bg-muted-foreground/30 group-hover:bg-muted-foreground/60'
                    )}
                  />
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
