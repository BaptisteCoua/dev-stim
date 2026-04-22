import { prisma } from '../utils/db'

export interface CreateUserJiraDto {
   accountId: string
   name: string
   email: string
   avatarUrl: string
   teamId: string
}

export const jiraUserRepository = {
   findByAccountId(accountId: string) {
      return prisma.userJira.findUnique({
         where: { accountId },
      })
   },

   create(data: CreateUserJiraDto) {
      return prisma.userJira.create({ data })
   },

   upsertByAccountId(data: CreateUserJiraDto) {
      return prisma.userJira.upsert({
         where: { accountId: data.accountId },
         update: {
            name: data.name,
            email: data.email,
            avatarUrl: data.avatarUrl,
            teamId: data.teamId,
         },
         create: data,
      })
   },
}
