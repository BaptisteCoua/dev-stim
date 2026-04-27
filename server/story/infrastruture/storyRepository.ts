import type { Story } from '~/server/story/domain/Story'
import { fromPrismaStory } from '#server/story/interface/storyMapper'
import { prisma } from '#server/utils/db'

export class StoryRepository {
   async findAll(): Promise<Story[]> {
      const stories = await prisma.story.findMany()

      return stories.map(fromPrismaStory)
   }

   async upsertByStoryId(story: Story): Promise<Story> {
      const payload = story.toDto()

      const persisted = await prisma.story.upsert({
         where: { storyId: story.storyId },
         update: {
            name: story.name,
            storyPoints: story.storyPoints,
            createdAt: story.createdAt,
            priority: story.priority,
         },
         create: {
            ...payload,
         },
      })

      return fromPrismaStory(persisted)
   }
}

export const storyRepository = new StoryRepository()
