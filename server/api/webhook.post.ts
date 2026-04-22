import { syncJiraUsersFromWebhook } from '~/server/services/jira/sync-jira-users'

export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   await syncJiraUsersFromWebhook(body)

   switch (body?.webhookEvent) {
      case 'jira:issue_created':
      case 'jira:issue_updated':
         // futur code
         break
      default:
         console.log(`[webhook] Unhandled event: ${body?.webhookEvent}`)
   }

   return { status: 'ok' }
})
