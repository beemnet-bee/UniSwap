import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET() {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const users = await db.adminUser.findMany({
    select: {
      username: true,
      email: true,
      createdAt: true,
    },
    orderBy: { username: 'asc' },
  })

  return NextResponse.json({
    users,
    currentUser: admin.username,
  })
}
