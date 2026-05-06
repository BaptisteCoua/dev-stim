import {
   extractStoryJiraIdFromIssueLinks,
   fromJiraIssueFieldsToDomain,
   type IJiraIssueFieldsPayload,
} from '~/server/ticket/interface/ticketMapper'
import { ticketRepository } from '~/server/ticket/infrastructure/ticketRepository'
import { prisma } from '#server/utils/db'

interface IJiraWebhookPayload {
   issue?: {
      id?: string
      key?: string
      fields?: IJiraIssueFieldsPayload
   }
}

export async function syncTicketsFromWebhook(body: IJiraWebhookPayload) {
   const issueId = body.issue?.id
   const fields = body.issue?.fields
   if (!issueId || !fields) return

   const ticket = fromJiraIssueFieldsToDomain(issueId, fields)

   const storyJiraId = extractStoryJiraIdFromIssueLinks(fields)

   if (!ticket) return

   const assigneeAccountId = fields.assignee?.accountId
   const userJira = assigneeAccountId
      ? await prisma.userJira.findUnique({ where: { accountId: assigneeAccountId } })
      : null

   await ticketRepository.upsertByTicketId(ticket, userJira?.id ?? null, storyJiraId ?? undefined)
}
