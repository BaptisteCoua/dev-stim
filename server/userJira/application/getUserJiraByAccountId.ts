import { toPersistedUserJiraDto } from '~/server/userJira/interface/userJiraMapper'
import { userJiraRepository } from '~/server/userJira/infrastructure/userJiraRepository'

export async function getUserJiraByAccountId(accountId: string) {
   const user = await userJiraRepository.findByAccountId(accountId)

   if (!user) {
      return null
   }

   return toPersistedUserJiraDto(user)
}
