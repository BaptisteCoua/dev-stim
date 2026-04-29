import type { Story as PrismaStory } from '~~/prisma/generated/prisma/client'
import type { PersistedStoryDto } from '~/technical/Story/shared/dto/StoryDto'
import { Story } from '~/server/story/domain/Story'

interface IJiraIssueFields {
   summary?: string
   priority?: { name?: string }
   issuetype?: { name?: string }
   assignee?: { accountId?: string } | null
}

interface IJiraLinkedIssue {
   id: string
   key: string
   fields: IJiraIssueFields
}

type JiraIssueLink =
   | { inwardIssue: IJiraLinkedIssue; outwardIssue?: never }
   | { outwardIssue: IJiraLinkedIssue; inwardIssue?: never }

export interface IJiraIssueFieldsPayload extends IJiraIssueFields {
   created?: string
   issuelinks?: JiraIssueLink[]
}

export function toPersistedStoryDto(story: Story): PersistedStoryDto & { id: string } {
   if (!story.id) {
      throw new Error('Cannot build toPersistedStoryDto without id')
   }

   return {
      id: story.id,
      ...story.toDto(),
   }
}

export function fromPrismaStory(story: PrismaStory): Story {
   return Story.create({
      id: story.id,
      storyId: story.storyId,
      name: story.name,
      storyPoints: Number(story.storyPoints),
      createdAt: story.createdAt,
      priority: story.priority,
   })
}

function parseStoryPointsFromSummary(summary: string): number | null {
   const match = summary.match(/\[(\d+(?:[.,]\d+)?)\s*pts\]/i)
   const raw = match?.[1]
   if (!raw) return null
   return Number(raw.replace(',', '.'))
}

function cleanTitle(summary: string): string {
   return summary.replace(/\[\d+(?:[.,]\d+)?\s*pts\]\s*\|\s*/i, '').trim()
}

export function fromJiraIssueFieldsToDomain(
   issueId: string,
   fields: IJiraIssueFieldsPayload,
): Story | null {
   if (fields.issuetype?.name !== 'Story') return null

   const createdAt = fields.created
   if (!createdAt) return null

   const summary = fields.summary
   if (!summary) return null

   const priority = fields.priority?.name
   if (!priority) return null

   const name = cleanTitle(summary)
   const points = parseStoryPointsFromSummary(summary) ?? 0

   return Story.create({
      storyId: issueId,
      name,
      storyPoints: points,
      createdAt,
      priority,
   })
}

export function fromJiraLinkedStoryToDomain(fields: IJiraIssueFieldsPayload): Story | null {
   const links = fields.issuelinks ?? []

   const linkedIssues: IJiraLinkedIssue[] = []

   for (const link of links) {
      if ('inwardIssue' in link) {
         if (link.inwardIssue) linkedIssues.push(link.inwardIssue)
      } else {
         if (link.outwardIssue) linkedIssues.push(link.outwardIssue)
      }
   }

   const storyIssue = linkedIssues.find((issue) => issue.fields.issuetype?.name === 'Story')
   if (!storyIssue) return null

   const createdAt = fields.created
   if (!createdAt) return null

   const summary = storyIssue.fields.summary
   if (!summary) return null

   const priority = storyIssue.fields.priority?.name
   if (!priority) return null

   const name = `${storyIssue.key} ${cleanTitle(summary)}`
   const points = parseStoryPointsFromSummary(summary) ?? 0

   return Story.create({
      storyId: storyIssue.id,
      name,
      storyPoints: points,
      createdAt,
      priority,
   })
}
