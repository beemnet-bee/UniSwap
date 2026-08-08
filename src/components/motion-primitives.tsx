'use client'

import * as React from 'react'
import {
  motion,
  useInView,
  type HTMLMotionProps,
  type Variants,
} from 'framer-motion'

/* ------------------------------------------------------------------ */
/* Reusable Framer Motion primitives tuned for the UniSWAP landing page */
/* ------------------------------------------------------------------ */

export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_SOFT },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_SOFT } },
}

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

/* A wrapper that fades + slides children up when scrolled into view. */
type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* Stagger container — children should be <Reveal> or motion.* with fadeUp */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  ...rest
}: HTMLMotionProps<'div'> & { stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* A motion item that uses the parent's stagger. */
export function StaggerItem({
  children,
  className,
  y = 24,
  ...rest
}: HTMLMotionProps<'div'> & { y?: number }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT_SOFT },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
