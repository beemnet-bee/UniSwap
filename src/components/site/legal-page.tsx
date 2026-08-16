'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { TypingText, TypingSection } from '@/components/site/typing-text'
import { cn } from '@/lib/utils'

export type LegalSubSection = {
  heading: string
  body: string
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
  accent?: 'blue' | 'red'
}

export type LegalSection = {
  heading: string
  body?: string
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
  accent?: 'blue' | 'red'
  subsections?: LegalSubSection[]
}

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const navItems = [
  { label: 'Community Guidelines', href: '/guidelines' },
  { label: 'Student Safety Guide', href: '/safety' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
]

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
  const pathname = usePathname()
  const router = useRouter()

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

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[200px_1fr_220px]">
            {/* Left navigation sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto pr-4">
              <nav className="space-y-1">
                <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  Documents
                </p>
                <div className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-secondary text-foreground font-semibold'
                            : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </nav>
            </aside>

            {/* Center main content */}
            <div className="min-w-0 space-y-10">
              {/* Mobile/Tablet navigation dropdown */}
              <div className="mb-6 lg:hidden">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground block mb-2">
                  Select Document
                </label>
                <select
                  value={pathname || ''}
                  onChange={(e) => router.push(e.target.value)}
                  className="w-full h-11 rounded-xl border border-border bg-card px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  {navItems.map((item) => (
                    <option key={item.href} value={item.href}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intro with typing animation */}
              <section id="overview" className="relative scroll-mt-24">
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
              </section>

              {/* Sections */}
              <section className="relative space-y-10 pb-16">
                {sections.map((section, i) => {
                  const sectionId = slugify(section.heading)
                  const hasSubs = section.subsections && section.subsections.length > 0

                  if (!hasSubs) {
                    return (
                      <TypingSection key={section.heading} delay={i * 0.1}>
                        <article
                          id={sectionId}
                          className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg sm:p-8 scroll-mt-24"
                        >
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
                    )
                  }

                  return (
                    <TypingSection key={section.heading} delay={i * 0.1}>
                      <div id={sectionId} className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground border-b border-border pb-2 mt-8">
                          {section.heading}
                        </h2>
                        {section.body && (
                          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {section.body}
                          </p>
                        )}
                        
                        <div className="space-y-6 mt-4">
                          {section.subsections!.map((sub, j) => {
                            const subId = slugify(sub.heading)
                            return (
                              <article
                                key={sub.heading}
                                id={subId}
                                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg sm:p-8 scroll-mt-24"
                              >
                                <div
                                  className={cn(
                                    'pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-60',
                                    sub.accent === 'red' || (j % 2 === 1 && sub.accent !== 'blue')
                                      ? 'bg-[#D84241]/15'
                                      : 'bg-primary/15'
                                  )}
                                />
                                <div className="relative flex items-start gap-4">
                                  {sub.icon && (
                                    <div
                                      className={cn(
                                        'grid h-11 w-11 shrink-0 place-items-center rounded-2xl',
                                        j % 2 === 0
                                          ? 'bg-primary/15 text-primary'
                                          : 'bg-[#D84241]/15 text-[#D84241]'
                                      )}
                                    >
                                      <sub.icon className="h-5 w-5" strokeWidth={1.75} />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <h3 className={cn(
                                      "text-lg font-bold tracking-tight",
                                      accent === 'red' ? 'text-[#D84241]' : 'text-primary'
                                    )}>
                                      {sub.heading}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                      {sub.body}
                                    </p>
                                  </div>
                                </div>
                              </article>
                            )
                          })}
                        </div>
                      </div>
                    </TypingSection>
                  )
                })}
              </section>

              {/* Back link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center pt-4"
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

            {/* Right table of contents sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto pl-4 border-l border-border">
              <nav className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  On This Page
                </p>
                <ul className="space-y-3 text-xs">
                  <li>
                    <a
                      href="#overview"
                      className="block text-muted-foreground hover:text-foreground transition-colors font-semibold"
                    >
                      Overview
                    </a>
                  </li>
                  {sections.map((section) => {
                    const sectionId = slugify(section.heading)
                    const hasSubs = section.subsections && section.subsections.length > 0
                    return (
                      <React.Fragment key={section.heading}>
                        <li className="pt-1">
                          <a
                            href={`#${sectionId}`}
                            className="block text-muted-foreground hover:text-foreground transition-colors font-semibold"
                          >
                            {section.heading}
                          </a>
                        </li>
                        {hasSubs &&
                          section.subsections!.map((sub) => {
                            const subId = slugify(sub.heading)
                            return (
                              <li key={sub.heading} className="pl-3.5 border-l border-border/50">
                                <a
                                  href={`#${subId}`}
                                  className="block text-muted-foreground/80 hover:text-foreground transition-colors py-0.5"
                                >
                                  {sub.heading}
                                </a>
                              </li>
                            )
                          })}
                      </React.Fragment>
                    )
                  })}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
