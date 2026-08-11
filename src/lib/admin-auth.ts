import { cookies } from 'next/headers'
import { db } from '@/lib/db'

/**
 * Verify the admin token from the httpOnly cookie.
 * Returns the AdminUser row if valid, null otherwise.
 */
export async function verifyAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    // Format: username:password:timestamp
    const parts = decoded.split(':')
    if (parts.length < 2) return null
    const username = parts[0]
    const password = parts[1]

    const user = await db.adminUser.findUnique({ where: { username } })
    if (!user) return null
    if (password !== user.password) return null

    return user
  } catch {
    return null
  }
}
