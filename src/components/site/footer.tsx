'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  ArrowUpRight,
} from 'lucide-react'

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
]

const footerNav = [
  {
    title: 'Product',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Features', href: '/features' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Impact', href: '/impact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Partner With Us', href: '/partner' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Student safety', href: '#' },
      { label: 'Community guidelines', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-auto border-t border-border bg-background"
    >
      {/* top accent stripe */}
      <div className="brand-stripe h-1 w-full" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-5">
            <Link href="#top" className="group inline-flex items-center gap-2.5">
              <motion.span
                whileHover={{ rotate: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="relative h-10 w-10 shrink-0"
              >
                <Image
                  src="/uniswap-icon.svg"
                  alt="UniSWAP"
                  fill
                  className="object-contain dark:hidden"
                  sizes="40px"
                />
                <Image
                  src="/uniswap-icon-white.svg"
                  alt="UniSWAP"
                  fill
                  className="hidden object-contain dark:block"
                  sizes="40px"
                />
              </motion.span>
              <span className="text-xl font-bold tracking-tight">
                Uni<span className="uniswap-gradient-text">SWAP</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A verified student marketplace for swapping, finding lost items,
              and giving your stuff a second life on campus. Built by students,
              for students.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href="mailto:hello@uniswap.app"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                hello@uniswap.app
              </a>
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-[#D84241]" />
                Cleveland, OH · Piloting nationwide
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                For pricing
              </p>
              <p className="mt-1 text-sm">
                Please contact{' '}
                <a
                  href="mailto:partners@uniswap.app"
                  className="font-medium text-[#D84241] underline-offset-2 hover:underline"
                >
                  partners@uniswap.app
                </a>{' '}
                for institution-specific pricing.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -3 }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-[#D84241] hover:text-[#D84241]"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-primary"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Get started
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    href="/partner"
                    className="text-foreground/80 transition-colors hover:text-[#D84241]"
                  >
                    Bring to campus
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-foreground/80 transition-colors hover:text-[#D84241]"
                  >
                    Become ambassador
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-foreground/80 transition-colors hover:text-[#D84241]"
                  >
                    Read FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} UniSWAP. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Piloting now · Made by students, for students
          </p>
        </div>
      </div>
    </footer>
  )
}
