import { getUserJiraByAccountId } from '~/server/userJira/application/getUserJiraByAccountId'

export default defineEventHandler(async (event) => {
   const accountId = getRouterParam(event, 'accountId')?.trim()

   if (!accountId) {
      throw createError({
         statusCode: 400,
         statusMessage: 'Missing accountId parameter',
      })
   }

   const user = await getUserJiraByAccountId(accountId)

   if (!user) {
      throw createError({
         statusCode: 404,
         statusMessage: `UserJira not found for accountId: ${accountId}`,
      })
   }

   return user
})
