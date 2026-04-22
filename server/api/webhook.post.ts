import type { JiraIssueWebhookPayload } from '~/server/userJira/interface/userJiraMapper'
import { syncJiraUsersFromWebhook } from '~/server/userJira/application/syncJiraUsersFromWebhook'

export default defineEventHandler(async (event) => {
   const body = await readBody<JiraIssueWebhookPayload>(event)

   await syncJiraUsersFromWebhook(body)
   console.log(`[webhook] Unhandled event: ${body?.webhookEvent}`)

   switch (body?.webhookEvent) {
      case 'jira:issue_created':
      case 'jira:issue_updated':
         break
      default:
         console.log(`[webhook] Unhandled event: ${body?.webhookEvent}`)
   }

   return { status: 'ok' }
})
