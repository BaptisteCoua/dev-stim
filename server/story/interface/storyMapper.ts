import type { Story as PrismaStory } from '~~/prisma/generated/prisma/client'
import type { PersistedStoryDto, StoryDto } from '~/technical/Story/shared/dto/StoryDto'
import { Story } from '~/server/story/domain/Story'

export interface JiraIssueFieldsPayload {
   created?: string
   issuelinks?: Array<{
      inwardIssue: {
         id: string
         key?: string
         fields: {
            summary: string
            priority: { name: string }
         }
      }
   }>
}

export function toDomainStory(data: StoryDto & { id?: string }): Story {
   return Story.create(data)
}
// vérifie que story.id existe, si oui ça construit un StoryDto :
export function toPersistedStoryDto(story: Story): PersistedStoryDto & { id: string } {
   if (!story.id) {
      throw new Error('Cannot build toPersistedStoryDto without id')
   }

   return {
      id: story.id,
      ...story.toDto(),
   }
}

// tranforme ce que prima renvoie en :
export function fromPrismaStory(story: PrismaStory): Story {
   return Story.create({
      id: story.id,
      storyId: story.storyId,
      name: story.name,
      storyPoints: story.storyPoints,
      createdAt: story.createdAt,
      priority: story.priority,
   })
}

function parseStoryPointsFromSummary(summary: string): number | null {
   const match = summary.match(/\[(\d+)\s*pts\]/i)
   return match ? Number(match[1]) : null
}

function cleanTitle(summary: string): string {
   return summary.replace(/\[\d+\s*pts\]\s*\|\s*/i, '').trim()
}

export function fromJiraDetailToDomain(detail: JiraIssueFieldsPayload): Story {
   const firstLink = detail.issuelinks?.[0]
   if (!firstLink) throw new Error('Jira payload: issuelinks[0] missing')

   const storyId = firstLink.inwardIssue.id
   const summary = firstLink.inwardIssue.fields.summary

   const storyPoints = parseStoryPointsFromSummary(summary) ?? 0
   const name = cleanTitle(summary)

   const createdAt = detail.created
   if (!createdAt) {
      throw new Error('Jira payload: created not found in issue.fields.created')
   }

   const priority = firstLink.inwardIssue.fields.priority?.name
   if (!priority) {
      throw new Error('Jira payload: priority not found in inwardIssue.fields.priority.name')
   }

   return Story.create({ storyId, name, storyPoints, createdAt, priority })
}
