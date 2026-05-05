import type { VersionDto } from '~/functional/Version/shared/dto/versionDto'

export class Version {
   private constructor(
      private readonly _name: string,
      private readonly _description: string,
      private readonly _releaseDate: Date,
      private readonly _startDate: Date,
      private readonly _progress: Date,
      private readonly _id?: string,
   ) {}

   static create(data: VersionDto & { id?: string }): Version {
      const name = data.name?.trim()
      const description = data.description?.trim()
      const releaseDate = toValidDate(data.releaseDate)
      const startDate = toValidDate(data.startDate)
      const progress = toValidDate(data.progress)

      if ( !name || !description || !releaseDate || !startDate || !progress) {
         throw new Error('Missing required fields for Version')
      }

      return new Version( name, description, releaseDate, startDate, progress, data.id)
   }

   get id(): string | undefined {
      return this._id
   }

   get name(): string {
      return this._name
   }

   get description(): string {
      return this._description
   }

   get releaseDate(): Date {
      return this._releaseDate
   }

   get startDate(): Date {
      return this._startDate
   }

   get progress(): Date {
      return this._progress
   }

   toDto(): VersionDto {
      return {
         name: this.name,
         description: this.description,
         releaseDate: this.releaseDate,
         startDate: this.startDate,
         progress: this.progress,
      }
   }
}

function toValidDate(value: Date): Date | null {
   const date = value instanceof Date ? value : new Date(value)

   return Number.isNaN(date.getTime()) ? null : date
}
