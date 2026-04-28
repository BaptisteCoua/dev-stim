export interface TicketDto {
   name: string
   ticketPoints: number
   createdAt: string | Date
   priority: string
   status: string
   assignees: Array<{ accountId: string; displayName: string }>
}

export interface PersistedStoryDto extends TicketDto {
   id: string
}
