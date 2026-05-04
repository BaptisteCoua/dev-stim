import { ticketRepository } from '#server/ticket/infrastructure/ticketRepository'
import { toPersistedTicketDto } from '#server/ticket/interface/ticketMapper'

export async function getAllTicket() {
   const users = await ticketRepository.findAll()

   return users.map(toPersistedTicketDto)
}
