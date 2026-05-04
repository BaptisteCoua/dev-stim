import type { Ticket as PrismaTicket } from '~~/prisma/generated/prisma/client'
import type { PersistedTicketDto } from '~/technical/Ticket/shared/dto/TicketDto'
import { Ticket } from '~/server/ticket/domain/Ticket'

interface IJiraIssueFields {
   summary?: string
   priority?: { name?: string }
   status?: { name?: string }
   issuetype?: { name?: string }
   customfield_10016?: string
   assignee?: { accountId?: string } | null
   issuelinks?: Array<{
      type?: { inward?: string; outward?: string }
      outwardIssue?: {
         key?: string
         id?: string
         fields?: {
            issuetype?: { name?: string }
         }
      }
      inwardIssue?: {
         key?: string
         id?: string
         fields?: {
            issuetype?: { name?: string }
         }
      }
   }>
}

export interface IJiraIssueFieldsPayload extends IJiraIssueFields {
   created?: string
   issuetype?: { name?: string }
}

export function extractStoryJiraIdFromIssueLinks(fields: IJiraIssueFieldsPayload): string | null {
   const links = fields.issuelinks ?? []

   for (const link of links) {
      const outwardType = link.outwardIssue?.fields?.issuetype?.name
      if (outwardType === 'Story' && link.outwardIssue?.id) return link.outwardIssue.id

      const inwardType = link.inwardIssue?.fields?.issuetype?.name
      if (inwardType === 'Story' && link.inwardIssue?.id) return link.inwardIssue.id
   }

   return null
}

export function toPersistedTicketDto(ticket: Ticket): PersistedTicketDto & { id: string } {
   if (!ticket.id) {
      throw new Error('Cannot build PersistedTicketDto without id')
   }

   return {
      id: ticket.id,
      ...ticket.toDto(),
   }
}

export function fromPrismaTicket(ticket: PrismaTicket): Ticket {
   return Ticket.create({
      id: ticket.id,
      ticketId: ticket.ticketId,
      name: ticket.name,
      ticketPoints: Number(ticket.ticketPoints),
      createdAt: ticket.createdAt,
      priority: ticket.priority,
      status: ticket.status,
      type: ticket.type,
   })
}

export function fromJiraIssueFieldsToDomain(
   issueId: string,
   fields: IJiraIssueFieldsPayload,
): Ticket | null {
   if (fields.issuetype?.name !== 'Task' && fields.issuetype?.name !== 'Bug') return null

   const createdAt = fields.created
   if (!createdAt) return null

   const name = fields.summary
   if (!name) return null

   const priority = fields.priority?.name
   if (!priority) return null

   const status = fields.status?.name
   if (!status) return null

   const issueType = fields.issuetype?.name
   if (!issueType) return null

   const pointsRaw = Number(fields.customfield_10016)
   const points = Number.isFinite(pointsRaw) ? pointsRaw : 0

   return Ticket.create({
      ticketId: issueId,
      name,
      ticketPoints: points,
      createdAt,
      priority,
      status,
      type: issueType,
   })
}
