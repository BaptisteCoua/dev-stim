import type { Sprint } from '~/server/sprint/domain/Sprint'
import { fromPrismaSprint } from '~/server/sprint/interface/sprintMapper'
import { prisma } from '~/server/utils/db'

export class SprintRepository {
   async findAll(): Promise<Sprint[]> {
      const sprints = await prisma.sprint.findMany()

      return sprints.map(fromPrismaSprint)
   }
}

export const sprintRepository = new SprintRepository()
