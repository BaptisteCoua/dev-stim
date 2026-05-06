import type { Ticket } from '~/server/ticket/domain/Ticket'
import { prisma } from '#server/utils/db'
import { fromPrismaTicket } from '#server/ticket/interface/ticketMapper'

export class TicketRepository {
   async findAll(): Promise<Ticket[]> {
      const tickets = await prisma.ticket.findMany()
      return tickets.map(fromPrismaTicket)
   }

   async upsertByTicketId(
      ticket: Ticket,
      userJiraId: string | null,
      storyJiraId?: string,
   ): Promise<Ticket> {
      const payload = ticket.toDto()

      const existingStory = storyJiraId
         ? await prisma.story.findUnique({
              where: { storyId: storyJiraId },
              select: { id: true },
           })
         : null

      const canConnectStory = Boolean(existingStory)

      const persisted = await prisma.ticket.upsert({
         where: { ticketId: ticket.ticketId },
         update: {
            name: ticket.name,
            ticketPoints: ticket.ticketPoints,
            createdAt: ticket.createdAt,
            priority: ticket.priority,
            status: ticket.status,
            type: ticket.type,
            userJiraId,
            ...(canConnectStory
               ? {
                    storys: {
                       connect: [{ storyId: storyJiraId! }],
                    },
                 }
               : {}),
         },
         create: {
            ...payload,
            userJiraId,
            ...(canConnectStory
               ? {
                    storys: {
                       connect: [{ storyId: storyJiraId! }],
                    },
                 }
               : {}),
         },
      })

      return fromPrismaTicket(persisted)
   }
}

export const ticketRepository = new TicketRepository()
