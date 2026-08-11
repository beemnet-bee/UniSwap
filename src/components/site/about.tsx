'use client'

import { motion } from 'framer-motion'
import { Leaf, Target, Telescope, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'

const blocks = [
  {
    icon: Leaf,
    eyebrow: 'Our story',
    title: 'Two students. One dumpster too many.',
    body: 'UniSWAP was created by two college students who noticed unsustainable consumption trends on their campus, piles of perfectly good furniture, textbooks, and electronics hauled to the curb at the end of every semester. Together they built a technical solution to the root of this problem, while emphasizing student safety and experience along the way.',
    accent: 'blue' as const,
  },
  {
    icon: Target,
    eyebrow: 'Our mission',
    title: 'Make the second-hand choice the first one.',
    body: 'Our mission is to provide a platform that makes it easier for students to choose second-hand exchange and more sustainable consumption practices. Buy, sell, or swap instead of buying new. Find instead of replace. Reuse instead of discard, without giving up convenience, safety, or your time.',
    accent: 'red' as const,
  },
  {
    icon: Telescope,
    eyebrow: 'Our vision',
    title: 'Circular consumption on every campus.',
    body: 'We envision circular consumption models established across college campuses worldwide, where reusing goods is the default, where move-out week no longer means a wave of waste, and where every campus is a self-sustaining loop of stuff moving from student to student instead of student to landfill.',
    accent: 'blue' as const,
  },
]

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
            About UniSWAP
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            We started UniSWAP because{' '}
            <span className="uniswap-gradient-text">campus waste is solvable.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Every spring, millions of pounds of usable goods leave college dorms
            for the landfill. We are building the platform that catches them
            before they hit the curb, and gives students an easier, safer,
            more sustainable way to pass things along.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <motion.article
              key={b.eyebrow}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* gradient blob */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-opacity group-hover:opacity-100 ${
                  b.accent === 'blue' ? 'bg-primary/20' : 'bg-[#D84241]/20'
                } opacity-60`}
              />
              {/* top accent stripe */}
              <div
                className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  b.accent === 'blue'
                    ? 'bg-gradient-to-r from-primary to-[#67B0C3]'
                    : 'bg-gradient-to-r from-[#D84241] to-[#67B0C3]'
                }`}
              />
              <div
                className={`relative mb-5 grid h-12 w-12 place-items-center rounded-2xl ${
                  b.accent === 'blue'
                    ? 'bg-primary/15 text-primary'
                    : 'bg-[#D84241]/15 text-[#D84241]'
                }`}
              >
                <b.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {b.eyebrow}
              </p>
              <h3 className="text-xl font-bold tracking-tight">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {b.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
