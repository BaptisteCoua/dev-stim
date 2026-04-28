import type { Ticket as PrismaTicket } from '~~/prisma/generated/prisma/client'
import type { PersistedTicketDto } from '~/technical/Ticket/shared/dto/TicketDto'
import { Ticket } from '~/server/ticket/domain/Ticket'

interface IJiraIssueFields {
   summary?: string
   priority?: { name?: string }
   issuetype?: { name?: string }
   customfield_10016?: string
   assignee?: { accountId?: string }
}

export interface IJiraIssueFieldsPayload extends IJiraIssueFields {
   created?: string
   issuetype?: { name?: string }
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
      type: ticket.type,
   })
}
/**
 * Convertit les champs d'une issue Jira en domaine Ticket.
 * Ne gère que les issues de type Task / Bug (pas les tickets liés).
 */
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

   const issueType = fields.issuetype?.name
   if (!issueType) return null

   const points = Number(fields.customfield_10016)

   return Ticket.create({
      ticketId: issueId,
      name,
      ticketPoints: points,
      createdAt,
      priority,
      type: issueType,
   })
}
