import type { UserJiraDto } from '~/technical/User/shared/dto/UserJiraDto'

export class UserJira {
   private constructor(
      private readonly _accountId: string,
      private readonly _name: string,
      private readonly _email: string,
      private readonly _avatarUrl: string,
      private readonly _id?: string,
   ) {}

   static create(data: UserJiraDto & { id?: string }): UserJira {
      const accountId = data.accountId?.trim()
      const name = data.name?.trim()
      const email = data.email?.trim()
      const avatarUrl = data.avatarUrl?.trim()

      if (!accountId || !name || !email || !avatarUrl) {
         throw new Error('Missing required fields for UserJira')
      }

      return new UserJira(accountId, name, email, avatarUrl, data.id)
   }

   get id(): string | undefined {
      return this._id
   }

   get accountId(): string {
      return this._accountId
   }

   get name(): string {
      return this._name
   }

   get email(): string {
      return this._email
   }

   get avatarUrl(): string {
      return this._avatarUrl
   }

   toDto(): UserJiraDto {
      return {
         accountId: this.accountId,
         name: this.name,
         email: this.email,
         avatarUrl: this.avatarUrl,
      }
   }
}
