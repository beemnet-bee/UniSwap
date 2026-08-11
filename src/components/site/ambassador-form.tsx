'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Megaphone,
  Sparkles,
  CheckCircle2,
  Clock,
  Mail,
  Linkedin,
} from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
    icon: Sparkles,
    title: 'Early access',
    description: 'Be the first to try new features and shape how they work before launch.',
  },
  {
    icon: Megaphone,
    title: 'Real say in the product',
    description: 'Your feedback goes directly to the team. Help us build what students need.',
  },
  {
    icon: CheckCircle2,
    title: 'Swag and perks',
    description: 'UniSWAP merch, exclusive ambassador events, and a LinkedIn recommendation.',
  },
]

export function AmbassadorForm() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = React.useState(false)
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    school: '',
    year: '',
    role: '',
    why: '',
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.school) {
      toast({
        title: 'Almost there',
        description: 'Please fill out your name, email, and school.',
        variant: 'destructive',
      })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          school: form.school,
          role: `Ambassador Application (${form.year || 'Year not specified'})`,
          message: form.why || 'Ambassador application submitted.',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit')
      }
      toast({
        title: 'Application received!',
        description: `We will review your application and email ${form.email} within 2 business days.`,
      })
      setForm({ name: '', email: '', school: '', year: '', role: '', why: '' })
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description:
          err instanceof Error
            ? err.message
            : 'Could not submit your application. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Benefits */}
      <section className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <b.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold tracking-tight">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.form
              onSubmit={onSubmit}
              className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-9"
            >
              <div className="mb-5 flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#D84241] text-white">
                  <Megaphone className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold tracking-tight">Ambassador Application</h2>
                  <p className="text-xs text-muted-foreground">Fill out the form below to apply</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Full name *
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
                      Email *
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jordan@cwru.edu"
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      School *
                    </Label>
                    <Input
                      value={form.school}
                      onChange={(e) => setForm({ ...form, school: e.target.value })}
                      placeholder="Case Western Reserve University"
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Year
                    </Label>
                    <Select
                      value={form.year}
                      onValueChange={(v) => setForm({ ...form, year: v })}
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select year..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freshman">Freshman</SelectItem>
                        <SelectItem value="sophomore">Sophomore</SelectItem>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="grad">Graduate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Why do you want to be an ambassador?
                  </Label>
                  <Textarea
                    value={form.why}
                    onChange={(e) => setForm({ ...form, why: e.target.value })}
                    placeholder="Tell us why you are excited about UniSWAP and how you would spread the word on your campus..."
                    className="min-h-28 rounded-xl"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="mt-6 h-12 w-full rounded-full bg-gradient-to-r from-primary to-[#D84241] text-base shadow-md hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit application'}
                {!submitting && <ArrowRight className="ml-1.5 h-4 w-4" />}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Response in 2 business days
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="h-3 w-3" /> uniswap.app.team@gmail.com
                </span>
              </div>
            </motion.form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
