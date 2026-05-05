import type { Story } from '~/server/story/domain/Story'
import { fromPrismaStory } from '#server/story/interface/storyMapper'
import { prisma } from '#server/utils/db'

export class StoryRepository {
   async findAll(): Promise<Story[]> {
      const stories = await prisma.story.findMany()
      return stories.map(fromPrismaStory)
   }

   async upsertByStoryId(
      story: Story,
      userJiraId: string | null,
      sprintJiraId?: string,
      versionJiraId?: string,
   ): Promise<Story> {
      const payload = story.toDto()

      const existingSprint = sprintJiraId
         ? await prisma.sprint.findUnique({
              where: { sprintJiraId },
              select: { id: true },
           })
         : null

      const existingVersion = versionJiraId
         ? await prisma.version.findUnique({
              where: { versionJiraId },
              select: { id: true },
           })
         : null

      const persisted = await prisma.story.upsert({
         where: { storyId: story.storyId },
         update: {
            name: story.name,
            storyPoints: story.storyPoints,
            createdAt: story.createdAt,
            priority: story.priority,
            userJiraId,
            ...(existingSprint ? { sprintId: existingSprint.id } : {}),
            ...(existingVersion ? { versionId: existingVersion.id } : {}),
         },
         create: {
            ...payload,
            userJiraId,
            ...(existingSprint ? { sprintId: existingSprint.id } : {}),
            ...(existingVersion ? { versionId: existingVersion.id } : {}),
         },
      })

      return fromPrismaStory(persisted)
   }
}

export const storyRepository = new StoryRepository()
