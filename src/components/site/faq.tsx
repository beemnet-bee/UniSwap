'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight, HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/lib/site-content'
import { Reveal } from '@/components/motion-primitives'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Faq() {
  return (
    <section
      id="faq"
      className="relative border-t border-border/60 bg-card/30 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <HelpCircle className="h-3.5 w-3.5 text-[#D84241]" />
            FAQ
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Questions from{' '}
            <span className="uniswap-gradient-text">campus admins.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            The most common questions we hear from student affairs offices,
            sustainability directors, and IT teams evaluating UniSWAP.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
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
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                        i % 2 === 0
                          ? 'bg-primary/15 text-primary'
                          : 'bg-[#D84241]/15 text-[#D84241]'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {f.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-10 text-sm leading-relaxed text-muted-foreground">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 sm:flex-row sm:p-8"
        >
          <div>
            <h3 className="text-lg font-bold">Still have questions?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We are happy to walk your team through UniSWAP in a 20-minute call.
            </p>
          </div>
          <Button asChild className="rounded-full bg-gradient-to-r from-primary to-[#D84241] px-6 hover:opacity-90">
            <Link href="/partner">
              Talk to our team <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
