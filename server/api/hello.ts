import { prisma } from '~/server/utils/db'

export default defineEventHandler(async () => {
   const count = await prisma.user.count()
   return { ok: true, users: count }
})
