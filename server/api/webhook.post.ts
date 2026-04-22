import { syncJiraUsersFromWebhook } from '../services/jira/sync-jira-users'

export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   switch (body?.webhookEvent) {
      case 'jira:issue_created':
      case 'jira:issue_updated':
         // request
         break
      default:
         await syncJiraUsersFromWebhook(body)
         console.log(`[webhook] Unhandled event: ${body?.webhookEvent}`)
   }

   return { status: 'ok' }
})
