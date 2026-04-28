import type { TicketDto } from '~/technical/Ticket/shared/dto/TicketDto'

export class Ticket {
   private constructor(
      private readonly _ticketId: string,
      private readonly _name: string,
      private readonly _ticketPoints: number,
      private readonly _createdAt: Date | string,
      private readonly _priority: string,
      private readonly _type: string,
      private readonly _id?: string,
   ) {}

   static create(data: TicketDto & { id?: string }): Ticket {
      const ticketId = data.ticketId?.trim()
      const name = data.name?.trim()
      const priority = data.priority?.trim()
      const type = data.type?.trim()

      const ticketPoints = data.ticketPoints
      const createdAt = data.createdAt

      if (!ticketId || !name || ticketPoints == null || !createdAt || !priority || !type) {
         throw new Error('Missing required fields for Story')
      }
      return new Ticket(ticketId, name, ticketPoints, createdAt, priority, type, data.id)
   }

   get id(): string | undefined {
      return this._id
   }

   get ticketId(): string {
      return this._ticketId
   }

   get name(): string {
      return this._name
   }

   get ticketPoints(): number {
      return this._ticketPoints
   }

   get createdAt(): Date {
      return new Date(this._createdAt)
   }

   get priority(): string {
      return this._priority
   }

   get type(): string {
      return this._type
   }

   toDto(): TicketDto {
      return {
         ticketId: this.ticketId,
         name: this.name,
         ticketPoints: this.ticketPoints,
         createdAt: this.createdAt,
         priority: this.priority,
         type: this.type,
      }
   }
}
