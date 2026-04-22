import { jiraUserRepository, type CreateUserJiraDto } from '../../repositories/jira-user.repository'

export default defineEventHandler(async (event) => {
   const body = await readBody<CreateUserJiraDto>(event)

   if (!body.accountId || !body.name || !body.email || !body.avatarUrl || !body.teamId) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
   }

   const existing = await jiraUserRepository.findByAccountId(body.accountId)
   const user = await jiraUserRepository.upsertByAccountId(body)
   return { data: user, created: !existing }
})
