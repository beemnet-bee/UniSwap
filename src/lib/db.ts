import { PrismaClient } from '@prisma/client'

// Force-load .env file to override any system environment variables
// that might have a stale DATABASE_URL (e.g. old SQLite path)
import { config } from 'dotenv'
config({ path: './.env', override: true })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
