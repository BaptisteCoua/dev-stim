export interface UserJiraDto {
   accountId: string
   name: string
   email: string
   avatarUrl: string
}

export interface PersistedUserJiraDto extends UserJiraDto {
   id: string
}
