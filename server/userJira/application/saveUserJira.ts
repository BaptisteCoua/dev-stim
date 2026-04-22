import type { UserJiraDto } from '~/shared/dto/UserJiraDto'
import {
   toPersistedUserJiraDto,
   toDomainUserJira,
} from '~/server/userJira/interface/userJiraMapper'
import { userJiraRepository } from '~/server/userJira/infrastructure/userJiraRepository'

export async function saveUserJira(
   data: UserJiraDto,
): Promise<{ data: ReturnType<typeof toPersistedUserJiraDto>; created: boolean }> {
   const user = toDomainUserJira(data)
   const existing = await userJiraRepository.findByAccountId(user.accountId)
   const saved = await userJiraRepository.upsertByAccountId(user)

   return {
      data: toPersistedUserJiraDto(saved),
      created: !existing,
   }
}
