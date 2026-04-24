import { prisma } from '~/server/utils/db'
import type { UserJira } from '~/server/userJira/domain/UserJira'
import { fromPrismaUserJira } from '~/server/userJira/interface/userJiraMapper'

export class UserJiraRepository {
   async findAll(): Promise<UserJira[]> {
      const users = await prisma.userJira.findMany()

      return users.map(fromPrismaUserJira)
   }

   async findByAccountId(accountId: string): Promise<UserJira | null> {
      const user = await prisma.userJira.findUnique({
         where: { accountId },
      })

      if (!user) {
         return null
      }

      return fromPrismaUserJira(user)
   }

   async upsertByAccountId(user: UserJira, teamId?: string): Promise<UserJira> {
      const payload = user.toDto()
      let resolvedTeamId = teamId

      if (!resolvedTeamId) {
         const existing = await prisma.userJira.findUnique({
            where: { accountId: user.accountId },
            select: { teamId: true },
         })

         if (!existing) {
            throw new Error('Missing teamId for new UserJira upsert')
         }

         resolvedTeamId = existing.teamId
      }

      const persisted = await prisma.userJira.upsert({
         where: { accountId: user.accountId },
         update: {
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            teamId: resolvedTeamId,
         },
         create: {
            ...payload,
            teamId: resolvedTeamId,
         },
      })

      return fromPrismaUserJira(persisted)
   }
}

export const userJiraRepository = new UserJiraRepository()
