import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'
import { sendReplyEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const filter = searchParams.get('filter') || 'all' // all | unread | replied

  const where: Record<string, unknown> = {}
  if (filter === 'unread') where.read = false
  if (filter === 'replied') where.replied = true
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { school: { contains: search } },
    ]
  }

  const messages = await db.adminMessage.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return NextResponse.json({ messages, currentUser: admin.username })
}

export async function PATCH(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, action, reply } = await req.json()

  if (action === 'markRead') {
    const updated = await db.adminMessage.update({
      where: { id },
      data: { read: true },
    })
    return NextResponse.json({ ok: true, message: updated })
  }

  if (action === 'markReplied') {
    const updated = await db.adminMessage.update({
      where: { id },
      data: {
        replied: true,
        reply: reply || null,
        repliedBy: admin.username,
        read: true,
      },
    })

    // Send the reply email to the user
    let emailSent = false
    let emailError: string | undefined
    if (reply && updated.email) {
      const result = await sendReplyEmail({
        to: updated.email,
        name: updated.name,
        replyText: reply,
        adminUsername: admin.username,
      })
      emailSent = result.sent
      emailError = result.error
    }

    return NextResponse.json({
      ok: true,
      message: updated,
      emailSent,
      emailError,
    })
  }

  if (action === 'delete') {
    await db.adminMessage.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
