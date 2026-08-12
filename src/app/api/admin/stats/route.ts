import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET() {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [
    totalMessages,
    unreadMessages,
    repliedMessages,
    totalViews,
    viewsToday,
    viewsByPath,
  ] = await Promise.all([
    db.adminMessage.count(),
    db.adminMessage.count({ where: { read: false } }),
    db.adminMessage.count({ where: { replied: true } }),
    db.pageView.count(),
    db.pageView.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    db.pageView.groupBy({
      by: ['path'],
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    }),
  ])

  // Recent messages (last 5)
  const recentMessages = await db.adminMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      school: true,
      read: true,
      replied: true,
      repliedBy: true,
      createdAt: true,
    },
  })

  // Unread chat count (for badge)
  const totalChats = await db.adminChat.count()

  // Views over time data
  const now = new Date()

  // Daily: last 7 days
  const dailyViews: { label: string; count: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date(now)
    dayStart.setDate(dayStart.getDate() - i)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)
    const count = await db.pageView.count({
      where: { createdAt: { gte: dayStart, lt: dayEnd } },
    })
    dailyViews.push({
      label: dayStart.toLocaleDateString('en-US', { weekday: 'short' }),
      count,
    })
  }

  // Monthly: last 6 months
  const monthlyViews: { label: string; count: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
    const count = await db.pageView.count({
      where: { createdAt: { gte: monthStart, lt: monthEnd } },
    })
    monthlyViews.push({
      label: monthStart.toLocaleDateString('en-US', { month: 'short' }),
      count,
    })
  }

  // Semi-annual: last 4 half-years (6-month periods)
  const semiViews: { label: string; count: number }[] = []
  for (let i = 3; i >= 0; i--) {
    const periodStart = new Date(now)
    periodStart.setMonth(periodStart.getMonth() - (i + 1) * 6)
    const periodEnd = new Date(now)
    periodEnd.setMonth(periodEnd.getMonth() - i * 6)
    const count = await db.pageView.count({
      where: { createdAt: { gte: periodStart, lt: periodEnd } },
    })
    const monthLabel = periodStart.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    semiViews.push({ label: monthLabel, count })
  }

  // Yearly: last 3 years
  const yearlyViews: { label: string; count: number }[] = []
  for (let i = 2; i >= 0; i--) {
    const yearStart = new Date(now.getFullYear() - i, 0, 1)
    const yearEnd = new Date(now.getFullYear() - i + 1, 0, 1)
    const count = await db.pageView.count({
      where: { createdAt: { gte: yearStart, lt: yearEnd } },
    })
    yearlyViews.push({
      label: String(now.getFullYear() - i),
      count,
    })
  }

  return NextResponse.json({
    totalMessages,
    unreadMessages,
    repliedMessages,
    totalViews,
    viewsToday,
    viewsByPath: viewsByPath.map((v) => ({ path: v.path, count: v._count.path })),
    recentMessages,
    totalChats,
    currentUser: admin.username,
    viewsOverTime: {
      daily: dailyViews,
      monthly: monthlyViews,
      semi: semiViews,
      yearly: yearlyViews,
    },
  })
}
