'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion'
import { Menu, X, Moon, Sun, ArrowRight, Home } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type NavItem = { href: string; label: string }

const navItems: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/impact', label: 'Impact' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/team', label: 'Team' },
  { href: '/faq', label: 'FAQ' },
  { href: '/partner', label: 'Partner With Us' },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  React.useEffect(() => setMounted(true), [])

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 12)
  })

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Determine if a nav item is "active" — exact match for routes
  const isActive = (item: NavItem) => pathname === item.href

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      >
        {/* CONTAINED floating pill — not full width */}
        <nav
          className={cn(
            'relative mx-auto flex h-16 max-w-6xl items-center justify-between overflow-hidden rounded-2xl px-3 transition-all duration-300 sm:px-4',
            scrolled
              ? 'border border-border/70 bg-background/85 shadow-lg shadow-foreground/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70'
              : 'border border-transparent bg-background/40 backdrop-blur-md supports-[backdrop-filter]:bg-background/30'
          )}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="relative h-9 w-9 shrink-0"
            >
              <Image
                src="/uniswap-icon-gradient.svg"
                alt="UniSWAP"
                fill
                className="object-contain"
                sizes="36px"
                priority
              />
            </motion.span>
            <span className="text-base font-bold tracking-tight sm:text-lg">
              Uni<span className="uniswap-gradient-text">SWAP</span>
            </span>
          </Link>

          {/* Desktop nav — bigger fonts per Creation.pdf */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-secondary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 rounded-full"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              asChild
              size="sm"
              className="hidden rounded-full px-4 shadow-sm md:inline-flex"
            >
              <Link href="/partner">
                Bring UniSWAP to your campus
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full lg:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Scroll progress bar — INSIDE the pill, no overflow */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left scroll-progress"
            style={{ scaleX: progress }}
          />
        </nav>

      </motion.header>

      {/* Mobile sidebar — slide in from the right */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[88%] max-w-sm flex-col border-l border-border bg-background shadow-2xl lg:hidden"
            >
              {/* top bar */}
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <Link href="/" className="flex items-center gap-2.5">
                  <span className="relative h-9 w-9 shrink-0">
                    <Image
                      src="/uniswap-icon-gradient.svg"
                      alt="UniSWAP"
                      fill
                      className="object-contain"
                      sizes="36px"
                    />
                  </span>
                  <span className="text-lg font-bold tracking-tight">
                    Uni<span className="uniswap-gradient-text">SWAP</span>
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Home link */}
              <div className="px-4 pt-4">
                <Link
                  href="/"
                  className={cn(
                    'group flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition-colors',
                    pathname === '/'
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                  )}
                >
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Home className="h-3.5 w-3.5" />
                  </span>
                  Home
                </Link>
              </div>

              {/* nav list */}
              <motion.nav
                className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                }}
              >
                {navItems.map((item, i) => {
                  const active = isActive(item)
                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: 24 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors',
                          active
                            ? 'bg-secondary text-foreground'
                            : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              'grid h-7 w-7 place-items-center rounded-lg text-xs font-bold',
                              i % 2 === 0
                                ? 'bg-primary/15 text-primary'
                                : 'bg-[#D84241]/15 text-[#D84241]'
                            )}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {item.label}
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.nav>

              {/* CTA + theme */}
              <div className="border-t border-border p-5">
                <Button asChild className="w-full rounded-full py-6 text-base">
                  <Link href="/partner">
                    Bring UniSWAP to your campus
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Made by students, for students
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
