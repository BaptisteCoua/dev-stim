import type { StoryDto } from '~/technical/Story/shared/dto/StoryDto'

export class Story {
   private constructor(
      private readonly _storyId: string,
      private readonly _name: string,
      private readonly _storyPoints: number,
      private readonly _createdAt: Date | string,
      private readonly _priority: string,
      private readonly _status?: string,
      private readonly _id?: string,
   ) {}

   static create(data: StoryDto & { id?: string }): Story {
      const storyId = data.storyId?.trim()
      const name = data.name?.trim()
      const priority = data.priority?.trim()
      const status = data.status?.trim()

      const storyPoints = data.storyPoints
      const createdAt = data.createdAt

      if (!storyId || !name || storyPoints == null || !createdAt || !priority) {
         throw new Error('Missing required fields for Story')
      }
      return new Story(storyId, name, storyPoints, createdAt, priority, status, data.id)
   }

   get id(): string | undefined {
      return this._id
   }

   get storyId(): string {
      return this._storyId
   }

   get name(): string {
      return this._name
   }

   get storyPoints(): number {
      return this._storyPoints
   }

   get createdAt(): Date {
      return new Date(this._createdAt)
   }

   get priority(): string {
      return this._priority
   }

   get status(): string | undefined {
      return this._status
   }

   toDto(): StoryDto {
      return {
         storyId: this.storyId,
         name: this.name,
         storyPoints: this.storyPoints,
         createdAt: this.createdAt,
         priority: this.priority,
         status: this.status,
      }
   }
}
