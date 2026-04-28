import type { Ticket as PrismaTicket } from '~~/prisma/generated/prisma/client'
import type { PersistedTicketDto, TicketDto } from '~/technical/Ticket/shared/dto/TicketDto'
import { Ticket } from '~/server/ticket/domain/Ticket'

export function toDomainTicket(data: TicketDto & { id?: string }): Ticket {
   return Ticket.create(data)
}

export function toPersistedTicketDto(ticket: Ticket): PersistedTicketDto {
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
