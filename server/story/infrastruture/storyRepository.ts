import { Story } from '~/server/story/domain/Story'
import { fromPrismaStory } from '#server/story/interface/storyMapper'

export class StoryRepository {
   async findAll(): Promise<Story[]> {
      const stories = await prisma.story.findMany()

      return stories.map(fromPrismaStory)
   }
}
