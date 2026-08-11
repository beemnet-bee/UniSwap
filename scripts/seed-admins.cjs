// Seed the 3 default admin users using Prisma
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const admins = [
    { username: 'admin1', password: 'admin1@uniswap', email: 'admin1@uniswap.app' },
    { username: 'admin2', password: 'admin2@uniswap', email: 'admin2@uniswap.app' },
    { username: 'admin3', password: 'admin3@uniswap', email: 'admin3@uniswap.app' },
  ]

  for (const admin of admins) {
    const created = await prisma.adminUser.upsert({
      where: { username: admin.username },
      update: { password: admin.password, email: admin.email },
      create: admin,
    })
    console.log(`  ${created.username}: id=${created.id}`)
  }

  // Clean up test data
  await prisma.adminUser.deleteMany({ where: { username: 'testadmin' } })
  await prisma.adminChat.deleteMany({})
  await prisma.adminMessage.deleteMany({})
  await prisma.pageView.deleteMany({})

  console.log('Done. 3 admins seeded.')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
