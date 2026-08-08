'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  LayoutDashboard,
  Users,
  Rocket,
} from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

const benefits = [
  {
    icon: Rocket,
    title: 'Branded rollout in under 4 weeks',
    description:
      'We handle setup, branding, and launch. Your campus gets a custom UniSWAP portal with your school colors and domain.',
  },
  {
    icon: LayoutDashboard,
    title: 'Real-time diversion dashboard',
    description:
      'Your sustainability office gets a live dashboard of swaps, weight diverted, and student participation — exportable for annual reports.',
  },
  {
    icon: Users,
    title: 'Dedicated launch manager + ambassador kit',
    description:
      'A launch manager guides rollout. We provide a student ambassador kit with posters, social templates, and onboarding guides.',
  },
  {
    icon: ShieldCheck,
    title: 'SSO-ready, FERPA-aware, secure',
    description:
      'Integrates with existing student platforms via SSO. FERPA-aware architecture. Verification through your .edu email system.',
  },
]

const timeline = [
  { week: 'Week 1', title: 'Discovery & kickoff', body: 'We meet your team, align on goals, and audit your current sustainability reporting needs.' },
  { week: 'Week 2', title: 'Branding & setup', body: 'Custom portal, SSO integration, and ambassador kit prepared. Your branding applied.' },
  { week: 'Week 3', title: 'Soft launch', body: 'Ambassadors onboarded. First swaps go live. We monitor and iterate daily.' },
  { week: 'Week 4', title: 'Full launch', body: 'Campus-wide rollout. Dashboard goes live. Press kit and launch announcement shipped.' },
]

export function PartnerDetail() {
  const { toast } = useToast()
  const [form, setForm] = React.useState({
    name: '',
    role: '',
    school: '',
    email: '',
    phone: '',
    students: '',
    message: '',
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.school || !form.email) {
      toast({
        title: 'Almost there',
        description: 'Please fill out your name, institution, and email so we can follow up.',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Thanks — we will be in touch',
      description: `Our partnerships team will email ${form.email} within 2 business days.`,
    })
    setForm({ name: '', role: '', school: '', email: '', phone: '', students: '', message: '' })
  }

  return (
    <>
      {/* Benefits + form */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — benefits */}
            <div>
              <Reveal>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  What you get
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  Everything you need to launch{' '}
                  <span className="uniswap-gradient-text">in 4 weeks.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  No lengthy procurement. No custom development. We bring the
                  platform, the playbook, and the people — you bring the campus.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                        i % 2 === 0
                          ? 'bg-primary/15 text-primary'
                          : 'bg-[#D84241]/15 text-[#D84241]'
                      }`}
                    >
                      <b.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-tight">{b.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {b.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* contact methods */}
              <Reveal delay={0.2} className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href="mailto:partners@uniswap.app"
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email us</p>
                    <p className="text-sm font-semibold">partners@uniswap.app</p>
                  </div>
                </a>
                <a
                  href="tel:+18005551234"
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-[#D84241]"
                >
                  <Phone className="h-5 w-5 text-[#D84241]" />
                  <div>
                    <p className="text-xs text-muted-foreground">Call us</p>
                    <p className="text-sm font-semibold">(800) 555-1234</p>
                  </div>
                </a>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={0.1}>
              <motion.form
                onSubmit={onSubmit}
                className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-bold tracking-tight">Request a proposal</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  No commitment. We just need a few details to start.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                        Your name *
                      </Label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jordan Rivera"
                        className="h-11 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                        Your role
                      </Label>
                      <Input
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="Sustainability Director"
                        className="h-11 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Institution *
                    </Label>
                    <Input
                      value={form.school}
                      onChange={(e) => setForm({ ...form, school: e.target.value })}
                      placeholder="Case Western Reserve University"
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                        Work email *
                      </Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jordan@cwru.edu"
                        className="h-11 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                        Phone (optional)
                      </Label>
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(216) 555-1234"
                        className="h-11 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Approximate student enrollment
                    </Label>
                    <Select
                      value={form.students}
                      onValueChange={(v) => setForm({ ...form, students: v })}
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select range…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under 5,000</SelectItem>
                        <SelectItem value="5k-15k">5,000 – 15,000</SelectItem>
                        <SelectItem value="15k-30k">15,000 – 30,000</SelectItem>
                        <SelectItem value="over-30k">Over 30,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Anything else? (optional)
                    </Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your sustainability goals, timeline, or questions…"
                      className="min-h-24 rounded-xl"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 h-12 w-full rounded-full bg-gradient-to-r from-primary to-[#D84241] text-base shadow-md hover:opacity-90"
                >
                  Get my proposal
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Avg. response: 2 business days
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Launch in 4 weeks
                  </span>
                </div>
              </motion.form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative border-y border-border/60 bg-card/30 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#D84241]">
              The rollout
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              From kickoff to launch in{' '}
              <span className="uniswap-gradient-text">four weeks.</span>
            </h2>
          </Reveal>

          <div className="relative mt-16">
            {/* vertical line for mobile / horizontal for desktop */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-[#67B0C3] to-[#D84241] lg:left-0 lg:right-0 lg:top-7 lg:h-px lg:w-full lg:bg-gradient-to-r" />
            <div className="space-y-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.week}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative pl-16 lg:pl-0"
                >
                  <div className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-2xl border-2 border-background bg-gradient-to-br from-primary to-[#D84241] text-xs font-bold text-white shadow-md lg:relative lg:mb-4">
                    {i + 1}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {t.week}
                  </p>
                  <h3 className="mt-1 text-base font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-card p-7 shadow-sm sm:flex-row sm:p-8">
              <div>
                <h3 className="text-lg font-bold">Still have questions?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Read the FAQ — questions from campus admins, answered.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/faq">
                  Read the FAQ
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
