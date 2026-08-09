'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Full-screen splash that shows the UniSWAP logo + tagline,
 * then fades out after ~2.5s. Mounted once at the app root.
 */
export function SplashScreen() {
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    // Short splash for fast perceived load — just enough to brand the entry.
    const t = setTimeout(() => setDone(true), 1600)
    const onKey = () => setDone(true)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* gradient backdrop */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/4 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[100px]" />
            <div className="absolute right-1/4 bottom-1/4 h-72 w-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D84241]/30 blur-[100px]" />
          </div>

          {/* logo mark */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary via-[#67B0C3] to-[#D84241] opacity-30 blur-2xl" />
            <div className="relative h-20 w-20">
              <Image
                src="/uniswap-icon-gradient.svg"
                alt="UniSWAP"
                fill
                className="object-contain"
                sizes="80px"
                priority
              />
            </div>
          </motion.div>

          {/* wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-7 text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Uni<span className="uniswap-gradient-text">SWAP</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep your goods in the loop
            </p>
          </motion.div>

          {/* loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="relative mt-8 h-1 w-44 overflow-hidden rounded-full bg-muted"
          >
            <motion.div
              className="absolute inset-y-0 left-0 w-full scroll-progress"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* tiny status pill */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="absolute bottom-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            loading campus marketplace
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
