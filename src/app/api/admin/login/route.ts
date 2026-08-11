import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const DEFAULT_ADMINS = [
  { username: 'admin1', password: 'admin1@uniswap', email: 'admin1@uniswap.app' },
  { username: 'admin2', password: 'admin2@uniswap', email: 'admin2@uniswap.app' },
  { username: 'admin3', password: 'admin3@uniswap', email: 'admin3@uniswap.app' },
]

async function ensureDefaultAdmins() {
  const count = await db.adminUser.count()
  if (count === 0) {
    for (const admin of DEFAULT_ADMINS) {
      await db.adminUser.create({ data: admin })
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureDefaultAdmins()

    const { username, password, rememberMe } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      )
    }

    const user = await db.adminUser.findUnique({
      where: { username: String(username).toLowerCase() },
    })

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      )
    }

    const token = Buffer.from(
      `${user.username}:${user.password}:${Date.now()}`
    ).toString('base64')

    const response = NextResponse.json({
      ok: true,
      token,
      username: user.username,
      email: user.email,
    })

    // If "Remember me" is checked, cookie lasts 30 days. Otherwise, session cookie (expires on browser close).
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : undefined

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge,
      path: '/',
    })
    return response
  } catch (err) {
    console.error('[POST /api/admin/login]', err)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
