import {
   fromJiraIssueFieldsToDomain,
   fromJiraLinkedStoryToDomain,
   type IJiraIssueFieldsPayload,
} from '~/server/story/interface/storyMapper'
import { storyRepository } from '~/server/story/infrastruture/storyRepository'
import { prisma } from '#server/utils/db'

interface IJiraWebhookPayload {
   issue?: {
      id?: string
      fields?: IJiraIssueFieldsPayload
   }
}

export async function syncStoriesFromWebhook(body: IJiraWebhookPayload) {
   const issueId = body.issue?.id
   const fields = body.issue?.fields
   if (!issueId || !fields) return

   const story = fromJiraIssueFieldsToDomain(issueId, fields) ?? fromJiraLinkedStoryToDomain(fields)

   if (!story) return

   const assigneeAccountId = fields.assignee?.accountId
   const userJira = assigneeAccountId
      ? await prisma.userJira.findUnique({ where: { accountId: assigneeAccountId } })
      : null

   await storyRepository.upsertByStoryId(story, userJira?.id ?? null)
}
