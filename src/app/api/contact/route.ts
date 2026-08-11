import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, role, school, phone, students, message } = body

    if (!name || !email || !school) {
      return NextResponse.json(
        { error: 'Name, email, and institution are required.' },
        { status: 400 }
      )
    }

    const saved = await db.adminMessage.create({
      data: {
        name: String(name),
        email: String(email),
        role: role ? String(role) : null,
        school: String(school),
        phone: phone ? String(phone) : null,
        students: students ? String(students) : null,
        message: message ? String(message) : null,
      },
    })

    return NextResponse.json({ ok: true, id: saved.id })
  } catch (err) {
    console.error('[POST /api/contact]', err)
    return NextResponse.json(
      { error: 'Failed to save message. Please try again.' },
      { status: 500 }
    )
  }
}
