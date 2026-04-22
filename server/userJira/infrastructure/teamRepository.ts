import { prisma } from '~/server/utils/db'

export class TeamRepository {
   findByName(name: string) {
      return prisma.team.findFirst({
         where: { name },
      })
   }

   create(name: string) {
      return prisma.team.create({
         data: { name },
      })
   }
}

export const teamRepository = new TeamRepository()
