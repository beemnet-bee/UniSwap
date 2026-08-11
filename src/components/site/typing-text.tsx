'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

/**
 * TypingText - Animates text appearing character by character.
 * Uses a typewriter effect with a blinking cursor.
 */
export function TypingText({
  text,
  speed = 30,
  delay = 0,
  className,
  showCursor = true,
  as: Tag = 'p',
}: {
  text: string
  speed?: number
  delay?: number
  className?: string
  showCursor?: boolean
  as?: React.ElementType
}) {
  const [displayed, setDisplayed] = React.useState('')
  const [started, setStarted] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  React.useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, started])

  return (
    <Tag className={className}>
      {displayed}
      {showCursor && started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </Tag>
  )
}

/**
 * TypingSection - Reveals a section with a stagger effect after typing completes.
 * Children fade in one by one.
 */
export function TypingSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
