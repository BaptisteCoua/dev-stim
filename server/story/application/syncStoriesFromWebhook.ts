import { fromJiraDetailToDomain } from '~/server/story/interface/storyMapper'
import { storyRepository } from '~/server/story/infrastruture/storyRepository'

export async function syncStoriesFromWebhook(body: any) {
   const detail = body.issue?.fields
   if (!detail?.issuelinks?.length) return

   const story = fromJiraDetailToDomain(detail)
   await storyRepository.upsertByStoryId(story)
}
