'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'
import {
  Leaf,
  Palette,
  Code2,
  ArrowUpRight,
  Mail,
  Linkedin,
  ArrowRight,
  Sparkles,
  Megaphone,
  MapPin,
} from 'lucide-react'

type Member = {
  name: string
  role: string
  subrole: string
  bio: string
  image: string
  icon: typeof Leaf
  accent: 'blue' | 'red'
  school: string
}

const founders: Member[] = [
  {
    name: 'Suong Tran',
    role: 'Co-Founder',
    subrole: 'Sustainability & Outreach Lead',
    bio: 'Leads sustainability partnerships and campus outreach. Works directly with student affairs and sustainability offices to align UniSWAP with each campus\'s waste-reduction goals and reporting needs.',
    image: '/team/suong-tran.png',
    icon: Leaf,
    accent: 'blue',
    school: 'CWRU',
  },
  {
    name: 'Suneha Shelke',
    role: 'Co-Founder',
    subrole: 'Design & Strategy Lead',
    bio: 'Owns product design and brand strategy. Shapes the UniSWAP experience to feel welcoming, safe, and genuinely fun — making reuse the obvious choice for students.',
    image: '/team/suneha-shelke.png',
    icon: Palette,
    accent: 'red',
    school: 'CWRU',
  },
  {
    name: 'Nikhil Shelke',
    role: 'App Developer',
    subrole: 'Engineering',
    bio: 'Builds and ships the UniSWAP app — verification flow, real-time messaging, swap tracking, and the dashboard. Believes good software makes good behavior easy.',
    image: '/team/nikhil-shelke.png',
    icon: Code2,
    accent: 'blue',
    school: 'CWRU',
  },
]

const openRoles = [
  {
    icon: Megaphone,
    title: 'Campus Ambassadors',
    description:
      'Bring UniSWAP to your campus. Get early access, swag, and a real say in the product. Open at all pilot schools.',
    accent: 'blue' as const,
  },
  {
    icon: Palette,
    title: 'Product Design Intern',
    description:
      'Help shape the mobile app, brand, and marketing site. Remote, part-time, student-friendly.',
    accent: 'red' as const,
  },
]

export function TeamDetail() {
  return (
    <>
      {/* Founders — big cards with photos */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              The team building UniSWAP.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              UniSWAP was created by college students who noticed unsustainable
              consumption trends on their campus. Together they built a
              technical solution to the root of this problem while emphasizing
              student safety and experience.
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {founders.map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
              >
                {/* gradient blob */}
                <div
                  className={cn(
                    'pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-2xl opacity-60 transition-opacity group-hover:opacity-100',
                    m.accent === 'blue' ? 'bg-primary/20' : 'bg-[#D84241]/20'
                  )}
                />

                {/* Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted to-secondary">
                  <div
                    className={cn(
                      'absolute inset-0',
                      m.accent === 'blue'
                        ? 'bg-gradient-to-br from-primary/20 to-[#67B0C3]/20'
                        : 'bg-gradient-to-br from-[#D84241]/20 to-[#67B0C3]/20'
                    )}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-background shadow-lg sm:h-36 sm:w-36">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 128px, 144px"
                      />
                    </div>
                  </div>
                  {/* role badge */}
                  <div className="absolute left-4 top-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-sm',
                        m.accent === 'blue'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-[#D84241]/20 text-[#D84241]'
                      )}
                    >
                      <m.icon className="h-3 w-3" />
                      {m.role}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="relative p-6">
                  <h3 className="text-xl font-bold tracking-tight">{m.name}</h3>
                  <p
                    className={cn(
                      'mt-0.5 text-sm font-medium',
                      m.accent === 'blue' ? 'text-primary' : 'text-[#D84241]'
                    )}
                  >
                    {m.subrole}
                  </p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {m.school}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {m.bio}
                  </p>

                  {/* socials */}
                  <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                      <Linkedin className="h-3.5 w-3.5" />
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-[#D84241] hover:text-[#D84241]">
                      <Mail className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* story callout */}
          <Reveal delay={0.2} className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-border bg-card/50 p-7 sm:p-10">
              <Sparkles className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                How it started
              </p>
              <p className="mt-3 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                &ldquo;UniSWAP was created by college students that noticed
                unsustainable consumption trends on their campus. Together they
                built a technical solution to the root of this problem while
                emphasizing student safety and experience.&rdquo;
              </p>
              <p className="mt-3 text-xs text-muted-foreground/70">
                — from the UniSWAP project brief
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Join the team — open roles */}
      <section className="relative border-y border-border/60 bg-card/30 py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-[#D84241]/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
              Join us
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Want to bring UniSWAP to{' '}
              <span className="uniswap-gradient-text">your campus?</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              We are recruiting student ambassadors and interns at pilot
              schools. Get early access, swag, and a real say in the product.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {openRoles.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className={cn(
                    'pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl opacity-60',
                    r.accent === 'blue' ? 'bg-primary/20' : 'bg-[#D84241]/20'
                  )}
                />
                <div
                  className={cn(
                    'relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl',
                    r.accent === 'blue'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-[#D84241]/15 text-[#D84241]'
                  )}
                >
                  <r.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="relative text-lg font-bold tracking-tight">{r.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
                <Link
                  href="/partner"
                  className={cn(
                    'relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors',
                    r.accent === 'blue' ? 'text-primary' : 'text-[#D84241]'
                  )}
                >
                  Apply now
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA to partner */}
          <Reveal delay={0.2} className="mt-12">
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl brand-gradient-surface p-7 text-white shadow-lg sm:flex-row sm:p-8">
              <div>
                <h3 className="text-lg font-bold">Represent your campus.</h3>
                <p className="mt-1 text-sm text-white/80">
                  Become a UniSWAP ambassador — get early access, swag, and
                  shape the product.
                </p>
              </div>
              <Link
                href="/partner"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-md transition-transform hover:scale-105"
              >
                Become an ambassador
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
