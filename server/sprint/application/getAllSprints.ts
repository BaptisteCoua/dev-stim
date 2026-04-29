import { sprintRepository } from '~/server/sprint/infrastructure/sprintRepository'
import { toPersistedSprintDto } from '~/server/sprint/interface/sprintMapper'

export async function getAllSprints() {
   const sprints = await sprintRepository.findAll()

   return sprints.map(toPersistedSprintDto)
}
