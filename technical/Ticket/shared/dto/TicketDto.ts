export interface TicketDto {
   ticketId: string
   name: string
   ticketPoints: number
   createdAt: string | Date
   priority: string
   type: string
}

export interface PersistedTicketDto extends TicketDto {
   id: string
}
