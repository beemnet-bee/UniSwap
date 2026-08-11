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
  })
}
