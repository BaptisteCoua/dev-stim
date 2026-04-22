import { prisma } from '~/server/utils/db'
import type { UserJira } from '~/server/userJira/domain/UserJira'
import { fromPrismaUserJira } from '~/server/userJira/interface/userJiraMapper'

export class UserJiraRepository {
   async findByAccountId(accountId: string): Promise<UserJira | null> {
      const user = await prisma.userJira.findUnique({
         where: { accountId },
      })

      if (!user) {
         return null
      }

      return fromPrismaUserJira(user)
   }

   async upsertByAccountId(user: UserJira): Promise<UserJira> {
      const payload = user.toDto()

      const persisted = await prisma.userJira.upsert({
         where: { accountId: user.accountId },
         update: {
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            teamId: user.teamId,
         },
         create: payload,
      })

      return fromPrismaUserJira(persisted)
   }
}

export const userJiraRepository = new UserJiraRepository()
