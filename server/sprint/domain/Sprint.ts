import type { SprintDto } from '~/functional/Sprint/shared/dto/sprintDto'

export class Sprint {
   private constructor(
      private readonly _statusId: string,
      private readonly _sprintJiraId: string,
      private readonly _name: string,
      private readonly _startDate: Date,
      private readonly _endDate: Date,
      private readonly _state: string,
      private readonly _originBoardId: string,
      private readonly _createdDate: Date,
      private readonly _completeDate: string,
      private readonly _id?: string,
   ) {}

   static create(data: SprintDto & { id?: string }): Sprint {
      const statusId = data.statusId?.trim()
      const sprintJiraId = data.sprintJiraId?.trim()
      const name = data.name?.trim()
      const startDate = toValidDate(data.startDate)
      const endDate = toValidDate(data.endDate)
      const state = data.state?.trim()
      const originBoardId = data.originBoardId?.trim()
      const createdDate = toValidDate(data.createdDate)
      const completeDate = data.completeDate?.trim()

      if (
         !statusId ||
         !sprintJiraId ||
         !name ||
         !startDate ||
         !endDate ||
         !state ||
         !originBoardId ||
         !createdDate
      ) {
         throw new Error('Missing required fields for Sprint')
      }

      return new Sprint(
         statusId,
         sprintJiraId,
         name,
         startDate,
         endDate,
         state,
         originBoardId,
         createdDate,
         completeDate ?? '',
         data.id,
      )
   }

   get id(): string | undefined {
      return this._id
   }

   get statusId(): string {
      return this._statusId
   }

   get sprintJiraId(): string {
      return this._sprintJiraId
   }

   get name(): string {
      return this._name
   }

   get startDate(): Date {
      return this._startDate
   }

   get endDate(): Date {
      return this._endDate
   }

   get state(): string {
      return this._state
   }

   get originBoardId(): string {
      return this._originBoardId
   }

   get createdDate(): Date {
      return this._createdDate
   }

   get completeDate(): string {
      return this._completeDate
   }

   toDto(): SprintDto {
      return {
         statusId: this.statusId,
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

function toValidDate(value: Date): Date | null {
   const date = value instanceof Date ? value : new Date(value)

   return Number.isNaN(date.getTime()) ? null : date
}
