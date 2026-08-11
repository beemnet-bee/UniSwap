import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json()
    if (!path || typeof path !== 'string') {
      return NextResponse.json({ ok: false })
    }

    // Don't track /admin pages
    if (path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ ok: true, tracked: false })
    }

    await db.pageView.create({ data: { path } })
    return NextResponse.json({ ok: true, tracked: true })
  } catch (err) {
    console.error('[POST /api/track]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
