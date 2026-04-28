export interface TicketDto {
   ticketId: string
   name: string
   ticketPoints: number
   createdAt: string | Date
   priority: string
   type: string
}

export interface PersistedStoryDto extends TicketDto {
   id: string
}
