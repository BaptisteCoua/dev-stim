import type { Story as PrismaStory } from '~~/prisma/generated/prisma/client'
import type { PersistedStoryDto, StoryDto } from '~/technical/Story/shared/dto/StoryDto'
import { Story } from '~/server/story/domain/Story'

export interface JiraWebhookStoryPayload {
   issuelinks: Array<{
      inwardIssue?: {
         fields?: {
            summary?: string
            priority?: { name: string }
         }
      }
   }>
   issue: {
      fields?: {
         created?: string
      }
   }
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

export function fromJiraDetailToDomain(detail: JiraWebhookStoryPayload): Story {
   const firstLink = detail.issuelinks?.[0]
   const summary = firstLink?.inwardIssue?.fields?.summary

   if (!summary) {
      throw new Error('Jira payload: summary not found in issuelinks')
   }

   const storyPoints = parseStoryPointsFromSummary(summary) ?? 0
   const name = cleanTitle(summary)

   const createdAt = detail.issue.fields?.created
   if (!createdAt) {
      throw new Error('Jira payload: created not found in issue.fields.created')
   }

   const priority = firstLink?.inwardIssue?.fields?.priority?.name
   if (!priority) {
      throw new Error(
         'Jira payload: priority not found in issuelinks[0].inwardIssue.fields.priority.name',
      )
   }

   return Story.create({
      name,
      storyPoints,
      createdAt,
      priority,
   })
}
