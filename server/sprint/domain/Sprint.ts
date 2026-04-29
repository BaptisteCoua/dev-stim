import type { SprintDto } from '~/functional/Sprint/shared/dto/sprintDto'

export class Sprint {
   private constructor(
      private readonly _sprintJiraId: string,
      private readonly _name: string,
      private readonly _startDate: Date | null,
      private readonly _endDate: Date | null,
      private readonly _state: string | null,
      private readonly _originBoardId: string | null,
      private readonly _createdDate: Date,
      private readonly _completeDate: string | null,
      private readonly _id?: string,
   ) {}

   static create(data: SprintDto & { id?: string }): Sprint {
      const sprintJiraId = data.sprintJiraId?.trim()
      const name = data.name?.trim()
      const startDate = toValidDate(data.startDate)
      const endDate = toValidDate(data.endDate)
      const state = data.state?.trim() || null
      const originBoardId = data.originBoardId?.trim() || null
      const createdDate = toValidDate(data.createdDate)
      const completeDate = data.completeDate?.trim() || null

      if (!sprintJiraId || !name || !createdDate) {
         throw new Error('Missing required fields for Sprint')
      }

      return new Sprint(
         sprintJiraId,
         name,
         startDate,
         endDate,
         state,
         originBoardId,
         createdDate,
         completeDate,
         data.id,
      )
   }

   get id(): string | undefined {
      return this._id
   }

   get sprintJiraId(): string {
      return this._sprintJiraId
   }

   get name(): string {
      return this._name
   }

   get startDate(): Date | null {
      return this._startDate
   }

   get endDate(): Date | null {
      return this._endDate
   }

   get state(): string | null {
      return this._state
   }

   get originBoardId(): string | null {
      return this._originBoardId
   }

   get createdDate(): Date {
      return this._createdDate
   }

   get completeDate(): string | null {
      return this._completeDate
   }

   toDto(): SprintDto {
      return {
         sprintJiraId: this.sprintJiraId,
         name: this.name,
         startDate: this.startDate,
         endDate: this.endDate,
         state: this.state,
         originBoardId: this.originBoardId,
         createdDate: this.createdDate,
         completeDate: this.completeDate,
      }
   }
}

function toValidDate(value: Date | null): Date | null {
   if (!value) return null

   const date = value instanceof Date ? value : new Date(value)

   return Number.isNaN(date.getTime()) ? null : date
}
