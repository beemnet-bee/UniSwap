'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type PageCta = {
  href: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  accent: 'blue' | 'red'
  cta: string
}

export function PageCtaCard({ cta, index }: { cta: PageCta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-xl"
    >
      {/* hover gradient */}
      <div
        className={cn(
          'pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100',
          cta.accent === 'blue' ? 'bg-primary/25' : 'bg-[#D84241]/25'
        )}
      />
      {/* top accent stripe */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100',
          cta.accent === 'blue'
            ? 'bg-gradient-to-r from-primary to-[#67B0C3]'
            : 'bg-gradient-to-r from-[#D84241] to-[#67B0C3]'
        )}
      />
      <div
        className={cn(
          'relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110',
          cta.accent === 'blue'
            ? 'bg-primary/15 text-primary'
            : 'bg-[#D84241]/15 text-[#D84241]'
        )}
      >
        <cta.icon className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h3 className="relative text-xl font-bold tracking-tight">{cta.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {cta.description}
      </p>
      <Link
        href={cta.href}
        className={cn(
          'relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors',
          cta.accent === 'blue'
            ? 'text-primary hover:text-[#1B5F7A]'
            : 'text-[#D84241] hover:text-[#6B1F1F]'
        )}
      >
        {cta.cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  )
}
