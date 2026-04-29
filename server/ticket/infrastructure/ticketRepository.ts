import type { Ticket } from '~/server/ticket/domain/Ticket'
import { prisma } from '#server/utils/db'
import { fromPrismaTicket } from '#server/ticket/interface/ticketMapper'

export class TicketRepository {
   async findAll(): Promise<Ticket[]> {
      const tickets = await prisma.ticket.findMany()
      return tickets.map(fromPrismaTicket)
   }

   async upsertByTicketId(ticket: Ticket, userJiraId: string | null): Promise<Ticket> {
      const payload = ticket.toDto()

      const persisted = await prisma.ticket.upsert({
         where: { ticketId: ticket.ticketId },
         update: {
            name: ticket.name,
            ticketPoints: ticket.ticketPoints,
            createdAt: ticket.createdAt,
            priority: ticket.priority,
            userJiraId,
         },
         create: {
            ...payload,
            userJiraId,
         },
      })

      return fromPrismaTicket(persisted)
   }
}

export const ticketRepository = new TicketRepository()
