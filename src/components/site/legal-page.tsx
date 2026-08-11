'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { TypingText, TypingSection } from '@/components/site/typing-text'
import { cn } from '@/lib/utils'

export type LegalSection = {
  heading: string
  body: string
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
  accent?: 'blue' | 'red'
}

export function LegalPage({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumbs,
  accent,
  intro,
  sections,
  lastUpdated,
}: {
  eyebrow: string
  title: string
  highlight?: string
  subtitle?: string
  crumbs: { label: string }[]
  accent: 'blue' | 'red'
  intro: string
  sections: LegalSection[]
  lastUpdated: string
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          subtitle={subtitle}
          crumbs={crumbs}
          accent={accent}
        />

        {/* Intro with typing animation */}
        <section className="relative py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-9">
              <div className="mb-4 flex items-center gap-2">
                <FileText className={cn('h-5 w-5', accent === 'blue' ? 'text-primary' : 'text-[#D84241]')} />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Last updated: {lastUpdated}
                </span>
              </div>
              <TypingText
                text={intro}
                speed={20}
                delay={300}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              />
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="relative pb-24 lg:pb-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {sections.map((section, i) => (
                <TypingSection key={section.heading} delay={i * 0.1}>
                  <article className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg sm:p-8">
                    <div
                      className={cn(
                        'pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-60',
                        section.accent === 'red' || (i % 2 === 1 && section.accent !== 'blue')
                          ? 'bg-[#D84241]/15'
                          : 'bg-primary/15'
                      )}
                    />
                    <div className="relative flex items-start gap-4">
                      {section.icon && (
                        <div
                          className={cn(
                            'grid h-11 w-11 shrink-0 place-items-center rounded-2xl',
                            i % 2 === 0
                              ? 'bg-primary/15 text-primary'
                              : 'bg-[#D84241]/15 text-[#D84241]'
                          )}
                        >
                          <section.icon className="h-5 w-5" strokeWidth={1.75} />
                        </div>
                      )}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold tracking-tight">
                          {String(i + 1).padStart(2, '0')}. {section.heading}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {section.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </TypingSection>
              ))}
            </div>

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
