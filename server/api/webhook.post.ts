import type { JiraIssueWebhookPayload } from '~/server/userJira/interface/userJiraMapper'
import { syncJiraUsersFromWebhook } from '~/server/userJira/application/syncJiraUsersFromWebhook'
import { syncStoriesFromWebhook } from '~/server/story/application/syncStoriesFromWebhook'
import { syncSprintsFromWebhook } from '~/server/sprint/application/syncSprintsFromWebhook'

export default defineEventHandler(async (event) => {
   const body = await readBody<JiraIssueWebhookPayload>(event)

   await syncJiraUsersFromWebhook(body)
   await syncStoriesFromWebhook(body)

   console.log('\x1b[34m%s\x1b[0m', `[webhook] Unhandled event: ${body?.webhookEvent}`)

   switch (body?.webhookEvent) {
      case 'jira:version_released':
      case 'jira:version_unreleased':
      case 'jira:version_created':
      case 'jira:version_moved':
      case 'jira:version_updated':
      case 'jira:version_deleted':
         console.log('\x1b[34m%s\x1b[0m', `[webhook] DEBUT VERSION ----------------------------`)
         console.log('\x1b[34m%s\x1b[0m', `[webhook] Version event: ${JSON.stringify(body)}`)
         console.log('\x1b[34m%s\x1b[0m', `[webhook] FIN VERSION ----------------------------`)
         break

      case 'jira:issue_created':
      case 'jira:issue_updated':
      case 'jira:issue_deleted':
         await syncStoriesFromWebhook(body)
         console.log('\x1b[34m%s\x1b[0m', `[webhook] DEBUT TICKET US ----------------------------`)
         console.log('\x1b[34m%s\x1b[0m', `[webhook] Version event: ${JSON.stringify(body)}`)
         console.log('\x1b[34m%s\x1b[0m', `[webhook] FIN TICKET US ----------------------------`)
         break

      case 'sprint_updated':
      case 'sprint_created':
      case 'sprint_deleted':
      case 'sprint_closed':
      case 'sprint_started':
         await syncSprintsFromWebhook(body)
         console.log('\x1b[34m%s\x1b[0m', `[webhook] DEBUT SPRINT US ----------------------------`)
         console.log('\x1b[34m%s\x1b[0m', `[webhook] Version event: ${JSON.stringify(body)}`)
         console.log('\x1b[34m%s\x1b[0m', `[webhook] FIN SPRINT US ----------------------------`)
         break

      default:
   }

   return { status: 'ok' }
})
