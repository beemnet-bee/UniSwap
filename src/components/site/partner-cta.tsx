'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

const benefits = [
  'Branded rollout for your campus in under 4 weeks',
  'Real-time diversion dashboard for your sustainability office',
  'Dedicated launch manager + student ambassador kit',
  'SSO-ready, FERPA-aware, integrates with existing student platforms',
]

export function PartnerCta() {
  const { toast } = useToast()
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [school, setSchool] = React.useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name || !school) {
      toast({
        title: 'Almost there',
        description: 'Please fill out name, school, and email so we can follow up.',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Thanks — we will be in touch',
      description: `Our partnerships team will email ${email} within 2 business days.`,
    })
    setEmail('')
    setName('')
    setSchool('')
  }

  return (
    <section
      id="partner"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] brand-gradient-surface p-8 text-white shadow-xl sm:p-12 lg:p-16">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D84241]/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#67B0C3]/40 blur-[100px]" />
          {/* dotted overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Left — pitch */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                  <Building2 className="h-3.5 w-3.5" />
                  Partner With Us
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Bring UniSWAP to your campus.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-base text-white/80 sm:text-lg">
                  Tell us a little about your institution and our partnerships
                  team will send a tailored proposal — pricing, rollout plan,
                  and a launch timeline — within two business days.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="mt-8 space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9DC8D5]" />
                      <span className="text-white/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
                  <a
                    href="mailto:partners@uniswap.app"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <Mail className="h-4 w-4" /> partners@uniswap.app
                  </a>
                  <a
                    href="tel:+18005551234"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <Phone className="h-4 w-4" /> (800) 555-1234
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right — form card */}
            <Reveal delay={0.1}>
              <motion.form
                onSubmit={onSubmit}
                whileHover={{ y: -2 }}
                className="rounded-3xl bg-card p-6 text-foreground shadow-2xl sm:p-8"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-bold tracking-tight">
                    Request a proposal
                  </h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  No commitment. We just need a few details to start.
                </p>

                <div className="mt-5 space-y-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Your name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jordan Rivera"
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Institution
                    </label>
                    <Input
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="Case Western Reserve University"
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Work email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jordan@cwru.edu"
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-5 h-12 w-full rounded-full bg-gradient-to-r from-primary to-[#D84241] text-base shadow-md hover:opacity-90"
                >
                  Get my proposal
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>

                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Avg. response time: under 2 business days
                </p>
              </motion.form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
