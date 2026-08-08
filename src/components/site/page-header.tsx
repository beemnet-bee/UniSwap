'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

type Crumb = { label: string; href?: string }

export function PageHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumbs,
  accent = 'blue',
}: {
  eyebrow: string
  title: string
  highlight?: string
  subtitle?: string
  crumbs?: Crumb[]
  accent?: 'blue' | 'red'
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={cn(
            'absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full blur-[120px]',
            accent === 'blue' ? 'bg-primary/20' : 'bg-[#D84241]/15'
          )}
        />
        <div
          className={cn(
            'absolute right-[-8rem] top-20 h-[28rem] w-[28rem] rounded-full blur-[120px]',
            accent === 'blue' ? 'bg-[#D84241]/15' : 'bg-primary/20'
          )}
        />
        <div className="uniswap-grid-bg absolute inset-0" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {crumbs && (
          <Reveal>
            <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <Home className="h-3 w-3" />
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-foreground">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.18em]',
              accent === 'blue' ? 'text-primary' : 'text-[#D84241]'
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}{' '}
            {highlight && (
              <span className="uniswap-gradient-text">{highlight}</span>
            )}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
