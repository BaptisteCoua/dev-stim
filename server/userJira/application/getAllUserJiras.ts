import { toPersistedUserJiraDto } from '~/server/userJira/interface/userJiraMapper'
import { userJiraRepository } from '~/server/userJira/infrastructure/userJiraRepository'

export async function getAllUserJiras() {
   const users = await userJiraRepository.findAll()

   return users.map(toPersistedUserJiraDto)
}
