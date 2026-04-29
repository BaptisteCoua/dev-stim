export interface SprintDto {
   sprintJiraId: string
   name: string
   startDate: Date | null
   endDate: Date | null
   state: string | null
   originBoardId: string | null
   createdDate: Date
   completeDate: string | null
}

export interface PersistedSprintDto extends SprintDto {
   id: string
}
