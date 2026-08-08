'use client'

import * as React from 'react'
import Link from 'next/link'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/* ------------------------------------------------------------------ */
/* Hero — copy + animated phone mockup                                 */
/* ------------------------------------------------------------------ */

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-24 sm:pt-36 lg:pt-44 lg:pb-32"
    >
      {/* Background layers — blue + red combination */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-[40rem] w-[40rem] rounded-full bg-primary/20 blur-[120px] dark:bg-primary/25" />
        <div className="absolute right-[-10rem] top-20 h-[32rem] w-[32rem] rounded-full bg-[#D84241]/15 blur-[120px]" />
        <div className="absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-[#67B0C3]/20 blur-[120px]" />
        <div className="uniswap-grid-bg absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left column — copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              variant="secondary"
              className="mb-5 gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D84241] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D84241]" />
              </span>
              Piloting now on select campuses
            </Badge>
          </motion.div>

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
            for students — and good for the planet.
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

          {/* trust badges — blue + red split */}
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

        {/* Right column — phone mockup + floating cards */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <PhoneMockup reduce={!!reduce} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Phone mockup — cycling screens, animated notifications              */
/* ------------------------------------------------------------------ */

type Screen = 'feed' | 'chat' | 'swap' | 'lost'

const catalog = [
  { icon: BookOpen, label: 'Calculus II', price: 'Swap', accent: 'blue' as const },
  { icon: Lamp, label: 'Desk Lamp', price: '$8', accent: 'red' as const },
  { icon: Refrigerator, label: 'Mini Fridge', price: '$30', accent: 'blue' as const },
  { icon: Backpack, label: 'Backpack', price: 'Swap', accent: 'red' as const },
]

const screenLabels: Record<Screen, string> = {
  feed: 'Browse',
  chat: 'Chat',
  swap: 'Swap',
  lost: 'Lost & Found',
}

function PhoneMockup({ reduce }: { reduce: boolean }) {
  const [screen, setScreen] = React.useState<Screen>('feed')
  const [notif, setNotif] = React.useState(0)

  // Cycle through screens automatically
  React.useEffect(() => {
    if (reduce) return
    const screens: Screen[] = ['feed', 'chat', 'swap', 'lost']
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % screens.length
      setScreen(screens[i])
    }, 3800)
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

      {/* Floating cards — cycle through 4 notifications */}
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

      {/* Floating card — top-right: live swap counter */}
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

      {/* Floating card — bottom-left: sustainability impact */}
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

      {/* Floating card — bottom-right: verified seller */}
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
        <div className="relative h-[36rem] w-[17.5rem] rounded-[2.75rem] border-[7px] border-foreground/90 bg-foreground p-1.5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:h-[38rem] sm:w-[18.5rem]">
          {/* notch */}
          <div className="absolute left-1/2 top-1.5 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground dark:bg-zinc-900" />
          {/* screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-white via-[#F7F8F8] to-[#E9F2F6] dark:from-[#131A1D] dark:via-[#0F1416] dark:to-[#1A2326]">
            {/* status bar */}
            <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-medium text-foreground/70">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <span className="h-1.5 w-3 rounded-sm bg-foreground/60" />
              </span>
            </div>

            <AnimatePresence mode="wait">
              {screen === 'feed' && <FeedScreen key="feed" />}
              {screen === 'chat' && <ChatScreen key="chat" />}
              {screen === 'swap' && <SwapScreen key="swap" />}
              {screen === 'lost' && <LostScreen key="lost" />}
            </AnimatePresence>

            {/* bottom tab bar */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-foreground/5 bg-white/85 px-2 py-2 backdrop-blur-md dark:bg-white/5">
              {[
                { icon: Search, active: screen === 'feed', screen: 'feed' as Screen },
                { icon: MapPin, active: screen === 'lost', screen: 'lost' as Screen },
                { icon: Repeat2, active: screen === 'swap', screen: 'swap' as Screen },
                { icon: MessageCircle, active: screen === 'chat', screen: 'chat' as Screen },
              ].map((t, i) => (
                <button
                  key={i}
                  onClick={() => setScreen(t.screen)}
                  className={`grid h-7 w-7 place-items-center rounded-full transition-colors ${
                    t.active
                      ? 'bg-gradient-to-br from-primary to-[#D84241] text-white'
                      : 'text-foreground/50'
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
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

      {/* screen indicator dots — below phone */}
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
/* Animated counter — counts up to `to` over time                      */
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
/* Phone screen: Feed                                                  */
/* ------------------------------------------------------------------ */

function FeedScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col pb-14"
    >
      {/* top app bar */}
      <div className="px-4 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground">Welcome back</p>
            <p className="text-base font-bold tracking-tight">Swap, don&apos;t toss.</p>
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-white">
            <Search className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 rounded-full bg-foreground/5 px-3 py-1.5 text-[10px] text-muted-foreground">
          <Search className="h-3 w-3" />
          <span>search textbooks, furniture…</span>
        </div>
      </div>

      {/* category chips */}
      <div className="mt-3 flex flex-wrap gap-1.5 px-4">
        {['All', 'Books', 'Tech', 'Free'].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
              i === 0
                ? 'bg-gradient-to-r from-primary to-[#D84241] text-white'
                : 'bg-foreground/5 text-foreground/70'
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      {/* featured card */}
      <div className="mt-3 px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl bg-gradient-to-br from-primary via-[#1B5F7A] to-[#6B1F1F] p-3 text-white shadow-md"
        >
          <div className="flex items-center justify-between text-[10px] opacity-90">
            <span className="inline-flex items-center gap-1">
              <BadgeCheck className="h-3 w-3" /> Verified seller
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" /> 0.3 mi
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/20">
              <Lamp className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold">LED Desk Lamp</p>
              <p className="text-[10px] opacity-80">Swap for textbooks</p>
            </div>
            <span className="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold">
              SWAP
            </span>
          </div>
        </motion.div>
      </div>

      {/* item grid — animated stagger entrance */}
      <div className="mt-3 grid grid-cols-2 gap-2 px-4">
        {catalog.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            className="rounded-xl bg-white p-2 shadow-sm dark:bg-white/5"
          >
            <div
              className={`grid h-12 w-full place-items-center rounded-lg ${
                it.accent === 'blue'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-[#D84241]/10 text-[#D84241]'
              }`}
            >
              <it.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="mt-1.5 text-[10px] font-semibold">{it.label}</p>
            <div className="flex items-center justify-between">
              <p
                className={`text-[9px] font-bold ${
                  it.accent === 'blue' ? 'text-primary' : 'text-[#D84241]'
                }`}
              >
                {it.price}
              </p>
              <Heart className="h-2.5 w-2.5 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Phone screen: Chat with typing indicator                            */
/* ------------------------------------------------------------------ */

function ChatScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col pb-14"
    >
      {/* chat header */}
      <div className="flex items-center gap-2 border-b border-foreground/5 px-4 py-3">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-[#1B5F7A] text-[10px] font-bold text-white">
          DK
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold">Daniel K.</p>
          <p className="flex items-center gap-1 text-[9px] text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online · .edu verified
          </p>
        </div>
        <BadgeCheck className="h-4 w-4 text-primary" />
      </div>

      {/* messages */}
      <div className="flex-1 space-y-2 overflow-hidden px-4 py-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-start"
        >
          <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-foreground/5 px-3 py-2 text-[10px]">
            Hey! Still got the desk lamp?
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end"
        >
          <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-primary to-[#1B5F7A] px-3 py-2 text-[10px] text-white">
            Yeah! Looking to swap for a Calc II textbook.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex justify-start"
        >
          <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-foreground/5 px-3 py-2 text-[10px]">
            Perfect — I have one. Meet at KSL Library?
          </div>
        </motion.div>

        {/* typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex justify-start"
        >
          <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-foreground/5 px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* input bar */}
      <div className="border-t border-foreground/5 px-3 py-2">
        <div className="flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1.5">
          <span className="text-[10px] text-muted-foreground">Type a message…</span>
          <div className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-white">
            <Send className="h-3 w-3" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Phone screen: Swap progress with animated steps                     */
/* ------------------------------------------------------------------ */

function SwapScreen() {
  const steps = [
    { icon: BadgeCheck, label: 'Verified', done: true },
    { icon: MessageCircle, label: 'Matched', done: true },
    { icon: MapPin, label: 'Meet up', done: true },
    { icon: Heart, label: 'Swap done', done: false },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col items-center px-4 pb-14 pt-5"
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Swap in progress
      </p>
      <p className="mt-1 text-base font-bold">Lamp ↔ Calculus II</p>
      <p className="text-[10px] text-muted-foreground">with Daniel K. · KSL Library</p>

      {/* swap visual */}
      <div className="mt-6 flex w-full items-center justify-center gap-3">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary"
        >
          <Lamp className="h-6 w-6" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-white"
        >
          <Repeat2 className="h-3.5 w-3.5" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-[#D84241]/15 text-[#D84241]"
        >
          <BookOpen className="h-6 w-6" />
        </motion.div>
      </div>

      {/* progress steps */}
      <div className="mt-7 w-full space-y-2.5">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="flex items-center gap-3"
          >
            <span
              className={`grid h-7 w-7 place-items-center rounded-full ${
                s.done
                  ? 'bg-gradient-to-br from-primary to-[#D84241] text-white'
                  : 'bg-foreground/5 text-muted-foreground'
              }`}
            >
              <s.icon className="h-3.5 w-3.5" />
            </span>
            <span className={`text-[11px] font-medium ${s.done ? '' : 'text-muted-foreground'}`}>
              {s.label}
            </span>
            {s.done && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.15, type: 'spring' }}
                className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* progress bar */}
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '75%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-[#67B0C3] to-[#D84241]"
        />
      </div>
      <p className="mt-1.5 text-[9px] text-muted-foreground">75% complete · 1 step left</p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Phone screen: Lost & Found                                          */
/* ------------------------------------------------------------------ */

function LostScreen() {
  const items = [
    { icon: BadgeCheck, label: 'Student ID Card', status: 'Found', location: 'KSL Library', color: 'emerald' as const },
    { icon: Backpack, label: 'Black Backpack', status: 'Lost', location: 'Tinkham Veale', color: 'red' as const },
    { icon: Headphones, label: 'White Earbuds', status: 'Found', location: 'Bingham', color: 'emerald' as const },
    { icon: Coffee, label: 'Hydro Flask', status: 'Lost', location: 'Fribley', color: 'red' as const },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col pb-14"
    >
      {/* header */}
      <div className="px-4 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Campus Lost & Found
            </p>
            <p className="text-base font-bold tracking-tight">Reunite your stuff</p>
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#D84241] to-[#6B1F1F] text-white">
            <MapPin className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* status tabs */}
      <div className="mt-3 flex gap-1.5 px-4">
        {['All', 'Lost', 'Found'].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
              i === 0
                ? 'bg-gradient-to-r from-primary to-[#D84241] text-white'
                : 'bg-foreground/5 text-foreground/70'
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      {/* item list */}
      <div className="mt-3 flex-1 space-y-2 overflow-hidden px-3">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
            className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm dark:bg-white/5"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                it.color === 'emerald'
                  ? 'bg-emerald-500/15 text-emerald-500'
                  : 'bg-[#D84241]/15 text-[#D84241]'
              }`}
            >
              <it.icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="flex-1 text-[10px] leading-tight">
              <p className="font-semibold">{it.label}</p>
              <p className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-2.5 w-2.5" />
                {it.location}
              </p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                it.color === 'emerald'
                  ? 'bg-emerald-500/15 text-emerald-500'
                  : 'bg-[#D84241]/15 text-[#D84241]'
              }`}
            >
              {it.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* post CTA */}
      <div className="absolute inset-x-3 bottom-14">
        <div className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-[#D84241] px-3 py-2 text-white">
          <span className="text-[10px] font-semibold">Report an item</span>
        </div>
      </div>
    </motion.div>
  )
}
