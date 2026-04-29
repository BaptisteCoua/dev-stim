export interface ProductionHealthDto {
   ok: boolean
   status: number
   statusText: string
   durationMs: number
   createdAt?: Date | string
}

export class ProductionHealth {
   private constructor(
      private readonly _ok: boolean,
      private readonly _status: number,
      private readonly _statusText: string,
      private readonly _durationMs: number,
      private readonly _createdAt?: Date | string,
      private readonly _id?: string,
   ) {}

   static create(data: ProductionHealthDto & { id?: string }): ProductionHealth {
      if (
         data.ok == null ||
         data.status == null ||
         data.statusText == null ||
         data.durationMs == null
      ) {
         throw new Error('Missing required fields for ProductionHealth')
      }

      return new ProductionHealth(
         data.ok,
         data.status,
         data.statusText,
         data.durationMs,
         data.createdAt,
         data.id,
      )
   }

   get id(): string | undefined {
      return this._id
   }

   get ok(): boolean {
      return this._ok
   }

   get status(): number {
      return this._status
   }

   get statusText(): string {
      return this._statusText
   }

   get durationMs(): number {
      return this._durationMs
   }

   get createdAt(): Date | undefined {
      if (!this._createdAt) {
         return undefined
      }

      return new Date(this._createdAt)
   }

   toDto(): ProductionHealthDto {
      return {
         ok: this.ok,
         status: this.status,
         statusText: this.statusText,
         durationMs: this.durationMs,
         createdAt: this.createdAt,
      }
   }
}
