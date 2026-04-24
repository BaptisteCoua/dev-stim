import type { StoryDto } from '~/technical/Story/shared/dto/StoryDto'

export class Story {
   private constructor(
      private readonly _name: string,
      private readonly _story_points: number,
      private readonly _createdAt: Date | string,
      private readonly _priority: string,
      private readonly _id?: string,
   ) {}

   static create(data: StoryDto & { id?: string }): Story {
      const name = data.name?.trim()
      const storyPoints = data.storyPoints
      const createdAt = data.createdAt
      const priority = data.priority?.trim()

      if (!name || storyPoints == null || !createdAt || !priority) {
         throw new Error('Missing required fields for Story')
      }
      return new Story(name, storyPoints, createdAt, priority, data.id)
   }

   get id(): string | undefined {
      return this._id
   }

   get name(): string {
      return this._name
   }

   get storyPoints(): number {
      return this._story_points
   }

   get createdAt(): Date {
      return new Date(this._createdAt)
   }

   get priority(): string {
      return this._priority
   }

   toDto(): StoryDto {
      return {
         name: this.name,
         storyPoints: this.storyPoints,
         createdAt: this.createdAt,
         priority: this.priority,
      }
   }
}
