import type { UserJiraDto } from '~/shared/dto/UserJiraDto'
import { saveUserJira } from '~/server/userJira/application/saveUserJira'

export default defineEventHandler(async (event) => {
   const body = await readBody<UserJiraDto>(event)

   try {
      return await saveUserJira(body)
   } catch (error) {
      throw createError({
         statusCode: 400,
         statusMessage: error instanceof Error ? error.message : 'Invalid payload',
      })
   }
})
