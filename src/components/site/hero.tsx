'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Recycle,
  Sparkles,
  Star,
  MessageCircle,
  Heart,
  Tag,
  Search,
  Bell,
  BookOpen,
  Lamp,
  Refrigerator,
  Backpack,
  Smartphone,
  Headphones,
  Coffee,
  Send,
  MapPin,
  ShieldCheck,
  Repeat2,
  Leaf,
  Plus,
  User,
  Megaphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/* ------------------------------------------------------------------ */
/* Hero, copy + animated phone mockup                                 */
/* ------------------------------------------------------------------ */

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-24 sm:pt-36 lg:pt-44 lg:pb-32"
    >
      {/* Background layers, blue + red combination */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-[40rem] w-[40rem] rounded-full bg-primary/20 blur-[120px] dark:bg-primary/25" />
        <div className="absolute right-[-10rem] top-20 h-[32rem] w-[32rem] rounded-full bg-[#D84241]/15 blur-[120px]" />
        <div className="absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-[#67B0C3]/20 blur-[120px]" />
        <div className="uniswap-grid-bg absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left column, copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
          >
            Keep your goods{' '}
            <span className="relative inline-block">
              <span className="uniswap-gradient-text">in the loop</span>
              <motion.svg
                viewBox="0 0 320 14"
                className="absolute -bottom-2 left-0 h-3 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
              >
                <motion.path
                  d="M2 9 C 80 2, 240 2, 318 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  className="text-[#D84241]"
                />
              </motion.svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            UniSWAP is the verified student marketplace for swapping, finding lost
            items, and giving your stuff a second life on campus. Built by students,
            for students, and good for the planet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-base shadow-md">
              <Link href="/partner">
                Bring UniSWAP to your campus
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-base">
              <Link href="/how-it-works">See how it works</Link>
            </Button>
          </motion.div>

          {/* trust badges, blue + red split */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-primary" />
              .edu verified students only
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Recycle className="h-4 w-4 text-[#D84241]" />
              Built for circular campus life
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              Free for students
            </span>
          </motion.div>
        </div>

        {/* Right column, phone mockup + floating cards */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <PhoneMockup reduce={!!reduce} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Phone mockup, cycling screens, animated notifications              */
/* ------------------------------------------------------------------ */

type Screen = 'home' | 'marketplace' | 'map'

const screenImages: Record<Screen, string> = {
  home: '/app-screens/screen-1-home.png',
  marketplace: '/app-screens/screen-2-marketplace.png',
  map: '/app-screens/screen-3-map.png',
}

const screenLabels: Record<Screen, string> = {
  home: 'Home',
  marketplace: 'Marketplace',
  map: 'Map',
}

function PhoneMockup({ reduce }: { reduce: boolean }) {
  const [screen, setScreen] = React.useState<Screen>('home')
  const [notif, setNotif] = React.useState(0)

  // Cycle through screens automatically
  React.useEffect(() => {
    if (reduce) return
    const screens: Screen[] = ['home', 'marketplace', 'map']
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % screens.length
      setScreen(screens[i])
    }, 4200)
    return () => clearInterval(id)
  }, [reduce])

  // Cycle notification card
  React.useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setNotif((n) => (n + 1) % 4)
    }, 3000)
    return () => clearInterval(id)
  }, [reduce])

  const floatY = (delay: number) => ({
    animate: reduce ? {} : { y: [0, -10, 0] },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  })

  const notifs = [
    {
      icon: BadgeCheck,
      title: '@maya.cwru.edu',
      sub: '.edu verified',
      color: 'primary',
    },
    {
      icon: MessageCircle,
      title: 'New message',
      sub: 'Still got the lamp?',
      color: 'red',
    },
    {
      icon: Heart,
      title: 'Swap completed',
      sub: '+2.4 lbs diverted',
      color: 'emerald',
    },
    {
      icon: Bell,
      title: 'Move-out deal live',
      sub: '3 new listings nearby',
      color: 'primary',
    },
  ] as const

  return (
    <div className="relative mx-auto flex min-h-[36rem] items-center justify-center lg:min-h-[42rem]">
      {/* pulsing aura behind phone */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-[#67B0C3]/20 to-[#D84241]/20 blur-[80px]"
        animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* glow behind phone */}
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/30 via-[#67B0C3]/30 to-[#D84241]/25 blur-[90px]" />

      {/* Floating cards, cycle through 4 notifications */}
      <motion.div
        key={`notif-${notif}`}
        initial={{ opacity: 0, scale: 0.9, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -8 }}
        transition={{ duration: 0.4 }}
        className="absolute left-0 top-6 z-20 sm:left-2 lg:-left-4"
        {...floatY(0.2)}
      >
        <div className="glass-card flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-lg">
          <span
            className={`grid h-8 w-8 place-items-center rounded-full ${
              notifs[notif].color === 'primary'
                ? 'bg-primary/15 text-primary'
                : notifs[notif].color === 'red'
                ? 'bg-[#D84241]/15 text-[#D84241]'
                : 'bg-emerald-500/15 text-emerald-500'
            }`}
          >
            {React.createElement(notifs[notif].icon, { className: 'h-4 w-4' })}
          </span>
          <div className="text-xs leading-tight">
            <p className="font-semibold">{notifs[notif].title}</p>
            <p className="text-muted-foreground">{notifs[notif].sub}</p>
          </div>
        </div>
      </motion.div>

      {/* Floating card, top-right: live swap counter */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-16 z-20 sm:right-2"
        {...floatY(0.6)}
      >
        <div className="glass-card flex items-center gap-3 rounded-2xl px-4 py-2.5 shadow-lg">
          <div className="relative">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-white">
              <Repeat2 className="h-4 w-4" />
            </span>
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div className="text-xs leading-tight">
            <p className="font-bold text-base">
              <AnimatedCounter to={1247} />
            </p>
            <p className="text-muted-foreground">swaps this week</p>
          </div>
        </div>
      </motion.div>

      {/* Floating card, bottom-left: sustainability impact */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 left-0 z-20 sm:left-2 lg:-left-4"
        {...floatY(1.0)}
      >
        <div className="glass-card flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-lg">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
            <Leaf className="h-4 w-4" />
          </span>
          <div className="text-xs leading-tight">
            <p className="font-semibold">2,847 lbs diverted</p>
            <p className="text-muted-foreground">campus total</p>
          </div>
        </div>
      </motion.div>

      {/* Floating card, bottom-right: verified seller */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 right-0 z-20 sm:right-2"
        {...floatY(0.4)}
      >
        <div className="glass-card flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-lg">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div className="text-xs leading-tight">
            <p className="font-semibold">Verified seller</p>
            <p className="text-muted-foreground">.edu confirmed</p>
          </div>
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
        whileHover={{ y: -6, rotate: 0.5 }}
      >
        <div className="relative h-[36rem] w-[17.5rem] rounded-[3rem] bg-gradient-to-b from-zinc-800 to-zinc-950 p-[4px] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6),0_0_0_2px_rgba(255,255,255,0.05)_inset,0_-2px_8px_rgba(0,0,0,0.4)_inset] sm:h-[38rem] sm:w-[18.5rem]">
          {/* Titanium frame highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-white/5" />
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-3 z-30 flex h-7 w-24 -translate-x-1/2 items-center justify-center gap-1.5 rounded-full bg-black ring-1 ring-zinc-800">
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <div className="h-1 w-8 rounded-full bg-zinc-800" />
          </div>
          {/* screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] bg-[#F3F4F6]">
            {/* Custom animated app screens */}
            <AnimatePresence mode="wait">
              {screen === 'home' && <HomeScreen key="home" />}
              {screen === 'marketplace' && <MarketplaceScreen key="marketplace" />}
              {screen === 'map' && <MapScreen key="map" />}
            </AnimatePresence>
          </div>
          {/* Side buttons - realistic */}
          <div className="absolute -left-[2px] top-24 h-7 w-[3px] rounded-l-sm bg-gradient-to-b from-zinc-600 to-zinc-800" />
          <div className="absolute -left-[2px] top-36 h-10 w-[3px] rounded-l-sm bg-gradient-to-b from-zinc-600 to-zinc-800" />
          <div className="absolute -left-[2px] top-50 h-10 w-[3px] rounded-l-sm bg-gradient-to-b from-zinc-600 to-zinc-800" />
          <div className="absolute -right-[2px] top-32 h-14 w-[3px] rounded-r-sm bg-gradient-to-b from-zinc-600 to-zinc-800" />
        </div>
      </motion.div>

      {/* reviews bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-4 left-1/2 z-30 hidden -translate-x-1/2 sm:block"
      >
        <div className="glass-card flex items-center gap-2 rounded-full px-4 py-2 shadow-lg">
          <div className="flex -space-x-2">
            {['MR', 'DK', 'PS'].map((i) => (
              <span
                key={i}
                className="grid h-6 w-6 place-items-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-[#D84241] text-[9px] font-bold text-white"
              >
                {i}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.9</span>
            <span className="text-muted-foreground">from 1.2k swaps</span>
          </div>
        </div>
      </motion.div>

      {/* screen indicator dots, below phone */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute -bottom-16 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1.5 sm:flex"
      >
        {(Object.keys(screenLabels) as Screen[]).map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s)}
            className="group flex flex-col items-center gap-1"
            aria-label={`Show ${screenLabels[s]} screen`}
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                screen === s
                  ? 'w-8 bg-gradient-to-r from-primary to-[#D84241]'
                  : 'w-1.5 bg-muted-foreground/30 group-hover:bg-muted-foreground/60'
              }`}
            />
            <span
              className={`text-[9px] font-medium transition-colors ${
                screen === s ? 'text-foreground' : 'text-muted-foreground/50'
              }`}
            >
              {screenLabels[s]}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Animated counter, counts up to `to` over time                      */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ to, duration = 2 }: { to: number; duration?: number }) {
  const [val, setVal] = React.useState(0)
  React.useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <>{val.toLocaleString()}</>
}

/* ------------------------------------------------------------------ */
/* Custom animated app screens (matching the real app UI)              */
/* ------------------------------------------------------------------ */

const NAVY = '#1B5F7A' // UniSWAP dark blue for app header
const BLUE = '#2B8FB9'
const LIGHT_BLUE = '#67B0C3'
const RED = '#D84241'

/* Shared bottom navigation bar */
function PhoneBottomNav({ active }: { active: 'home' | 'marketplace' | 'map' }) {
  const tabs = [
    { icon: Search, label: 'Home', key: 'home' as const },
    { icon: Tag, label: 'Market', key: 'marketplace' as const },
    { icon: Plus, label: 'Sell', key: 'sell' as const, center: true },
    { icon: MessageCircle, label: 'Messages', key: 'chat' as const },
    { icon: User, label: 'Profile', key: 'profile' as const },
  ]
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-gray-200 bg-white px-1 py-2">
      {tabs.map((t) => (
        <div key={t.key} className="flex flex-col items-center gap-0.5">
          {t.center ? (
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-white shadow-md"
            >
              <t.icon className="h-4 w-4" />
            </motion.div>
          ) : (
            <t.icon
              className={`h-4 w-4 ${active === t.key ? 'text-[#2B8FB9]' : 'text-gray-400'}`}
            />
          )}
          <span
            className={`text-[8px] ${active === t.key ? 'font-bold text-[#2B8FB9]' : 'text-gray-400'}`}
          >
            {t.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* Status bar */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 pt-2 text-[9px] font-semibold text-white">
      <span>2:31</span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-white" />
        <span className="h-2 w-3 rounded-sm bg-white" />
        <span>97</span>
      </span>
    </div>
  )
}

/* Screen 1: Home */
function HomeScreen() {
  const categories = ['Academic Supplies', 'Electronics', 'Furniture & Decor', 'Cloth...']
  const cards = [
    { label: 'LIMITED-TIME DEALS', color: 'bg-yellow-50', textColor: 'text-yellow-500', emoji: 'star' },
    { label: 'freebies!', color: 'bg-white', textColor: 'text-gray-700', emoji: 'heart' },
    { label: 'Lost & Found', color: 'bg-pink-50', textColor: 'text-pink-600', emoji: 'pin' },
    { label: 'RECENTLY ADDED!', color: 'bg-white', textColor: 'text-yellow-500', emoji: 'new' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col"
    >
      {/* Header */}
      <div className="bg-[#1B5F7A] px-3 pb-3 pt-2">
        <StatusBar />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-primary to-[#D84241]">
              <Recycle className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-white">UniSWAP</span>
          </div>
          <span className="text-[10px] text-white/80">Welcome, Suneha!</span>
        </div>
        {/* Search bar */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5">
            <Search className="h-3 w-3 text-gray-400" />
            <span className="text-[10px] text-gray-400">Search...</span>
          </div>
          <div className="relative grid h-7 w-7 place-items-center rounded-full bg-white/20">
            <Bell className="h-3.5 w-3.5 text-white" />
            <span className="absolute -right-0.5 -top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#D84241] text-[7px] font-bold text-white">
              1
            </span>
          </div>
        </div>
        {/* Category tabs */}
        <div className="mt-2.5 flex gap-1.5 overflow-hidden">
          {categories.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`whitespace-nowrap text-[9px] font-medium text-white ${i === 0 ? 'font-bold' : 'opacity-70'}`}
            >
              {c}
              {i < categories.length - 1 && <span className="ml-1.5 opacity-40">|</span>}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2 overflow-hidden p-2.5">
        {/* 2x2 grid */}
        <div className="grid grid-cols-2 gap-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.03 }}
              className={`relative flex h-16 items-center justify-center rounded-xl ${card.color} p-2 text-center shadow-sm`}
            >
              <span className={`text-[9px] font-bold ${card.textColor}`}>{card.label}</span>
              {card.label === 'RECENTLY ADDED!' && (
                <span className="absolute bottom-1 right-1 rounded-full bg-[#D84241] px-1.5 py-0.5 text-[7px] font-bold text-white">
                  New
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Swap Shop card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#2B8FB9] to-[#67B0C3] p-2.5 text-white"
        >
          <div>
            <p className="text-[11px] font-bold">SWAP Shop</p>
            <p className="text-[8px] opacity-90">Trade items with others!</p>
          </div>
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Repeat2 className="h-5 w-5" />
          </motion.div>
        </motion.div>

        {/* Requested Items card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 rounded-xl border-2 border-[#1B5F7A] bg-white p-2.5"
        >
          <Megaphone className="h-4 w-4 text-[#1B5F7A]" />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-[#1B5F7A]">Requested Items</p>
            <p className="text-[8px] text-gray-500">See what buyers want</p>
          </div>
          <ArrowRight className="h-3 w-3 text-[#1B5F7A]" />
        </motion.div>
      </div>

      <PhoneBottomNav active="home" />
    </motion.div>
  )
}

/* Screen 2: Marketplace */
function MarketplaceScreen() {
  const categories = [
    { label: 'Academic Supplies', color: 'from-blue-400 to-blue-600', icon: BookOpen },
    { label: 'Electronics', color: 'from-purple-400 to-purple-600', icon: Headphones },
    { label: 'Furniture & Decor', color: 'from-green-400 to-green-600', icon: Lamp },
    { label: 'Clothing & Accs', color: 'from-pink-400 to-pink-600', icon: Backpack },
    { label: 'Sports & Fitness', color: 'from-orange-400 to-orange-600', icon: Tag },
    { label: 'Kitchen & Dining', color: 'from-teal-400 to-teal-600', icon: Coffee },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col"
    >
      {/* Header */}
      <div className="bg-[#1B5F7A] px-3 pb-3 pt-2">
        <StatusBar />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-white">Marketplace</span>
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-white" />
            <div className="relative">
              <Bell className="h-3.5 w-3.5 text-white" />
              <span className="absolute -right-1 -top-1 grid h-3 w-3 place-items-center rounded-full bg-[#D84241] text-[6px] font-bold text-white">
                1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div className="flex-1 overflow-hidden p-3">
        <div className="grid grid-cols-2 gap-2.5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className={`relative flex h-20 items-center justify-center bg-gradient-to-br ${cat.color}`}>
                <cat.icon className="h-8 w-8 text-white/90" strokeWidth={1.5} />
              </div>
              <p className="py-1.5 text-center text-[9px] font-semibold text-gray-700">
                {cat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <PhoneBottomNav active="marketplace" />
    </motion.div>
  )
}

/* Screen 3: Map */
function MapScreen() {
  const pins = [
    { num: 2, x: '20%', y: '30%' },
    { num: 3, x: '50%', y: '20%' },
    { num: 3, x: '70%', y: '40%' },
    { num: 4, x: '35%', y: '55%' },
    { num: 5, x: '60%', y: '65%' },
    { num: 3, x: '25%', y: '70%' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col"
    >
      {/* Header */}
      <div className="bg-[#1B5F7A] px-3 pb-3 pt-2">
        <StatusBar />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-white">Marketplace</span>
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-white" />
            <div className="relative">
              <Bell className="h-3.5 w-3.5 text-white" />
              <span className="absolute -right-1 -top-1 grid h-3 w-3 place-items-center rounded-full bg-[#D84241] text-[6px] font-bold text-white">
                1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category pill */}
      <div className="bg-[#F3F4F6] px-3 py-2">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-block rounded-full bg-gray-200 px-3 py-1 text-[9px] font-medium text-gray-700"
        >
          Other / Misc
        </motion.span>
      </div>

      {/* Product card */}
      <div className="px-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-xl bg-white shadow-sm"
        >
          <div className="h-20 bg-gradient-to-br from-gray-700 to-gray-900" />
        </motion.div>
      </div>

      {/* Map section */}
      <div className="flex-1 overflow-hidden px-3 pt-2">
        <div className="mb-1.5 flex items-center gap-1">
          <MapPin className="h-3 w-3 text-[#2B8FB9]" />
          <span className="text-[10px] font-semibold text-gray-700">Listings Near You</span>
        </div>
        <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-blue-50">
          {/* Map roads */}
          <div className="absolute inset-0">
            <div className="absolute left-0 right-0 top-1/3 h-0.5 bg-gray-200" />
            <div className="absolute left-0 right-0 top-2/3 h-0.5 bg-gray-200" />
            <div className="absolute left-1/3 top-0 h-full w-0.5 bg-gray-200" />
            <div className="absolute left-2/3 top-0 h-full w-0.5 bg-gray-200" />
          </div>

          {/* Location count badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-[#2B8FB9] px-2.5 py-1 text-[8px] font-bold text-white shadow-md"
          >
            10 locations with items
          </motion.div>

          {/* Map pins */}
          {pins.map((pin, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.2 }}
              className="absolute"
              style={{ left: pin.x, top: pin.y }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="grid h-7 w-7 place-items-center rounded-full bg-[#2B8FB9] text-[9px] font-bold text-white shadow-md ring-2 ring-white"
              >
                {pin.num}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <PhoneBottomNav active="marketplace" />
    </motion.div>
  )
}
