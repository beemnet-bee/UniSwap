'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/lib/site-content'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'
import { ArrowRight, HelpCircle, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FaqDetail() {
  return (
    <>
      {/* Accordion */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal delay={0.1}>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-3"
            >
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.question}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-sm data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                    <span className="flex items-center gap-3 pr-4">
                      <span
                        className={cn(
                          'grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold',
                          i % 2 === 0
                            ? 'bg-primary/15 text-primary'
                            : 'bg-[#D84241]/15 text-[#D84241]'
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {f.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Still have questions */}
      <section className="relative border-y border-border/60 bg-card/30 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
              Still curious
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Did not find your answer?
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              We are happy to walk your team through UniSWAP in a 20-minute call.
              No pressure, no sales pitch, just answers.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <motion.a
              href="mailto:uniswap.app.team@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Mail className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold tracking-tight">Email us</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  uniswap.app.team@gmail.com
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#D84241]/15 text-[#D84241]">
                <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold tracking-tight">Book a call</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  20 minutes, no commitment
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </motion.div>
          </div>

          <Reveal delay={0.2} className="mt-10">
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl brand-gradient-surface p-7 text-white shadow-lg sm:flex-row sm:p-8">
              <div>
                <h3 className="text-lg font-bold">Ready to bring UniSWAP to your campus?</h3>
                <p className="mt-1 text-sm text-white/80">
                  Get a tailored proposal, pricing, rollout plan, and launch timeline, in 2 business days.
                </p>
              </div>
              <Button asChild className="shrink-0 rounded-full bg-white px-6 text-foreground hover:bg-white/90">
                <Link href="/partner">
                  Get a proposal
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
