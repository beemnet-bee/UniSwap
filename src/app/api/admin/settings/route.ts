import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET() {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    username: admin.username,
    email: admin.email,
    passwordSet: !!admin.password,
  })
}

export async function PATCH(req: NextRequest) {
  const admin = await verifyAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { username, password } = await req.json()

  const data: { username?: string; password?: string } = {}

  // Handle username change
  if (username && username !== admin.username) {
    // Check if username is taken
    const existing = await db.adminUser.findUnique({
      where: { username: String(username).toLowerCase() },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'That username is already taken.' },
        { status: 400 }
      )
    }
    data.username = String(username).toLowerCase()
  }

  if (password) {
    data.password = String(password)
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ ok: true, username: admin.username, passwordSet: true })
  }

  const updated = await db.adminUser.update({
    where: { id: admin.id },
    data,
  })

  // If password or username changed, issue a new token
  let newToken: string | undefined
  if (password || data.username) {
    newToken = Buffer.from(
      `${updated.username}:${updated.password}:${Date.now()}`
    ).toString('base64')
  }

  const response = NextResponse.json({
    ok: true,
    username: updated.username,
    email: updated.email,
    passwordSet: !!updated.password,
  })

  if (newToken) {
    response.cookies.set('admin_token', newToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
  }

  return response
}
