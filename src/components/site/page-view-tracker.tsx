'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Fires a page-view tracking event on every route change.
 * Skips /admin and /api routes.
 */
export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {
      // silently fail, tracking is non-critical
    })
  }, [pathname])

  return null
}
