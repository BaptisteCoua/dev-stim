import type { JiraIssueWebhookPayload } from '~/server/userJira/interface/userJiraMapper'
import { syncJiraUsersFromWebhook } from '~/server/userJira/application/syncJiraUsersFromWebhook'

export default defineEventHandler(async (event) => {
   const body = await readBody<JiraIssueWebhookPayload>(event)

   await syncJiraUsersFromWebhook(body)

   console.log('\x1b[34m%s\x1b[0m', `[webhook] Unhandled event: ${body?.webhookEvent}`)

   /*console.log(JSON.stringify(body))*/

   switch (body?.webhookEvent) {
      case 'jira:issue_created':
      case 'jira:issue_updated':
         break
      default:
   }

   return { status: 'ok' }
})
