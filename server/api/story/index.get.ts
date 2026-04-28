import { getAllStory } from '#server/story/application/getAllStory'

export default defineEventHandler(async () => {
   return await getAllStory()
})
