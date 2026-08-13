import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'

// Auto-delete old messages based on retention setting
async function cleanupOldMessages() {
  let settings = await db.adminChatSettings.findUnique({ where: { id: 'default' } })
  if (!settings) {
    settings = await db.adminChatSettings.create({ data: { id: 'default' } })
  }
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - settings.retentionDays)
  await db.adminChat.deleteMany({ where: { createdAt: { lt: cutoff } } })
  return settings
}

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const settings = await cleanupOldMessages()

  const { searchParams } = new URL(req.url)
  const afterId = searchParams.get('afterId')

  let messages
  if (afterId) {
    const ref = await db.adminChat.findUnique({ where: { id: afterId } })
    if (ref) {
      messages = await db.adminChat.findMany({
        where: { createdAt: { gt: ref.createdAt } },
        orderBy: { createdAt: 'asc' },
        take: 100,
        include: { reactions: true, seenBy: true },
      })
    } else {
      messages = await db.adminChat.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: { reactions: true, seenBy: true },
      })
    }
  } else {
    messages = await db.adminChat.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { reactions: true, seenBy: true },
    })
  }

  // Mark as seen by current admin
  const reversed = [...messages].reverse()
  for (const msg of reversed) {
    if (!msg.seenBy.some((s) => s.username === admin.username)) {
      await db.adminChatSeen.create({
        data: { chatId: msg.id, username: admin.username },
      }).catch(() => {})
    }
  }

  return NextResponse.json({
    messages: reversed.map((m) => ({
      id: m.id,
      username: m.username,
      message: m.message,
      editedAt: m.editedAt,
      replyToId: m.replyToId,
      replyToUsername: m.replyToUsername,
      replyToMessage: m.replyToMessage,
      attachment: m.attachment,
      attachmentName: m.attachmentName,
      attachmentType: m.attachmentType,
      createdAt: m.createdAt,
      reactions: m.reactions,
      seenBy: m.seenBy.map((s) => s.username),
    })),
    currentUser: admin.username,
    retentionDays: settings.retentionDays,
  })
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { message, replyToId, attachment, attachmentName, attachmentType } = body

  if (!message && !attachment) {
    return NextResponse.json({ error: 'Message or attachment required.' }, { status: 400 })
  }

  const trimmed = (message || '').trim().slice(0, 5000)

  // Get reply target info
  let replyToUsername: string | null = null
  let replyToMessage: string | null = null
  if (replyToId) {
    const ref = await db.adminChat.findUnique({ where: { id: replyToId } })
    if (ref) {
      replyToUsername = ref.username
      replyToMessage = ref.message.slice(0, 100)
    }
  }

  const created = await db.adminChat.create({
    data: {
      username: admin.username,
      message: trimmed,
      replyToId: replyToId || null,
      replyToUsername,
      replyToMessage,
      attachment: attachment || null,
      attachmentName: attachmentName || null,
      attachmentType: attachmentType || null,
    },
  })

  // Mark as seen by sender
  await db.adminChatSeen.create({
    data: { chatId: created.id, username: admin.username },
  }).catch(() => {})

  return NextResponse.json({
    ok: true,
    message: {
      ...created,
      reactions: [],
      seenBy: [admin.username],
    },
  })
}

export async function PATCH(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, action, message } = await req.json()

  if (action === 'edit') {
    const msg = await db.adminChat.findUnique({ where: { id } })
    if (!msg) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (msg.username !== admin.username) {
      return NextResponse.json({ error: 'Can only edit your own messages' }, { status: 403 })
    }
    const updated = await db.adminChat.update({
      where: { id },
      data: { message: message.trim().slice(0, 5000), editedAt: new Date() },
    })
    return NextResponse.json({ ok: true, message: updated })
  }

  if (action === 'react') {
    const { emoji } = await req.json()
    // Toggle reaction
    const existing = await db.adminChatReaction.findUnique({
      where: { chatId_username_emoji: { chatId: id, username: admin.username, emoji } },
    })
    if (existing) {
      await db.adminChatReaction.delete({ where: { id: existing.id } })
    } else {
      await db.adminChatReaction.create({
        data: { chatId: id, username: admin.username, emoji },
      })
    }
    return NextResponse.json({ ok: true })
  }

  if (action === 'setRetention') {
    const { days } = await req.json()
    if (days < 1 || days > 365) {
      return NextResponse.json({ error: 'Days must be 1-365' }, { status: 400 })
    }
    await db.adminChatSettings.upsert({
      where: { id: 'default' },
      update: { retentionDays: days },
      create: { id: 'default', retentionDays: days },
    })
    return NextResponse.json({ ok: true, retentionDays: days })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
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

  const msg = await db.adminChat.findUnique({ where: { id } })
  if (!msg) {
    return NextResponse.json({ error: 'Message not found.' }, { status: 404 })
  }
  if (msg.username !== admin.username) {
    return NextResponse.json({ error: 'You can only delete your own messages.' }, { status: 403 })
  }

  await db.adminChat.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
