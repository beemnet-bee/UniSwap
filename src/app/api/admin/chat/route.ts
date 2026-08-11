import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const afterId = searchParams.get('afterId') // for polling new messages only

  let messages
  if (afterId) {
    // Get the createdAt of the afterId message, then fetch newer
    const ref = await db.adminChat.findUnique({ where: { id: afterId } })
    if (ref) {
      messages = await db.adminChat.findMany({
        where: { createdAt: { gt: ref.createdAt } },
        orderBy: { createdAt: 'asc' },
        take: 100,
      })
    } else {
      messages = await db.adminChat.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
    }
  } else {
    // Initial load, last 50 messages
    messages = await db.adminChat.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  }

  return NextResponse.json({
    messages: messages.reverse(),
    currentUser: admin.username,
  })
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { message } = await req.json()
  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json(
      { error: 'Message is required.' },
      { status: 400 }
    )
  }

  // Limit message length
  const trimmed = message.trim().slice(0, 2000)

  const created = await db.adminChat.create({
    data: {
      username: admin.username,
      message: trimmed,
    },
  })

  return NextResponse.json({ ok: true, message: created })
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: 'Message ID required.' }, { status: 400 })
  }

  // Only the sender can delete their own message
  const msg = await db.adminChat.findUnique({ where: { id } })
  if (!msg) {
    return NextResponse.json({ error: 'Message not found.' }, { status: 404 })
  }
  if (msg.username !== admin.username) {
    return NextResponse.json(
      { error: 'You can only delete your own messages.' },
      { status: 403 }
    )
  }

  await db.adminChat.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
