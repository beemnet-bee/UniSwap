// Fix: The sandbox environment has a stale DATABASE_URL env var pointing to old SQLite.
// We set the correct Neon URL BEFORE requiring PrismaClient so it reads the right value.
const NEON_URL = 'postgresql://neondb_owner:npg_cznt6ZJxaUk9@ep-nameless-meadow-aye60ib0.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require'

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:')) {
  process.env.DATABASE_URL = NEON_URL
}

// Now require PrismaClient AFTER env var is set
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ datasourceUrl: NEON_URL })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
