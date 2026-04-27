export interface VersionDto {
   statusId: string
   name: string
   description: string
   releaseDate: Date
   startDate: Date
   progress: Date
}

export interface PersistedVersionDto extends VersionDto {
   id: string
}
