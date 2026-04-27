import {
   fromJiraDetailToDomain,
   type IJiraIssueFieldsPayload,
} from '~/server/story/interface/storyMapper'
import { storyRepository } from '~/server/story/infrastruture/storyRepository'

interface IJiraWebhookPayload {
   issue?: {
      fields?: IJiraIssueFieldsPayload
   }
}

export async function syncStoriesFromWebhook(body: IJiraWebhookPayload) {
   const detail = body.issue?.fields
   if (!detail?.issuelinks?.length) return

   const story = fromJiraDetailToDomain(detail)
   if (!story) return
   await storyRepository.upsertByStoryId(story)
}
