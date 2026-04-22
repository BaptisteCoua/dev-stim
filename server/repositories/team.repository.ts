import { prisma } from '../utils/db'

export const teamRepository = {
   findByName(name: string) {
      return prisma.team.findFirst({
         where: { name },
      })
   },

   create(name: string) {
      return prisma.team.create({
         data: { name },
      })
   },
}
