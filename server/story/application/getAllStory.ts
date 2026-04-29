import { storyRepository } from '~/server/story/infrastruture/storyRepository'
import { toPersistedStoryDto } from '#server/story/interface/storyMapper'

export async function getAllStory() {
   const users = await storyRepository.findAll()

   return users.map(toPersistedStoryDto)
}
