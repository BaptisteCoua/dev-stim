import type { Sprint as PrismaSprint } from '~~/prisma/generated/prisma/client'
import type { PersistedSprintDto, SprintDto } from '~/functional/Sprint/shared/dto/sprintDto'
import { Sprint } from '~/server/sprint/domain/Sprint'

export function toDomainSprint(data: SprintDto & { id?: string }): Sprint {
   return Sprint.create(data)
}

export function toPersistedSprintDto(sprint: Sprint): PersistedSprintDto {
   if (!sprint.id) {
      throw new Error('Cannot build PersistedSprintDto without id')
   }

   return {
      id: sprint.id,
      ...sprint.toDto(),
   }
}

export function fromPrismaSprint(sprint: PrismaSprint): Sprint {
   return Sprint.create({
      id: sprint.id,
      sprintJiraId: sprint.sprintJiraId,
      name: sprint.name,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      state: sprint.state,
      originBoardId: sprint.originBoardId,
      createdDate: sprint.createdDate,
      completeDate: sprint.completeDate,
   })
}
