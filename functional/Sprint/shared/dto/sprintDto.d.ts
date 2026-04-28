export interface SprintDto {
   statusId: string
   sprintJiraId: string
   name: string
   startDate: Date
   endDate: Date
   state: string
   originBoardId: string
   createdDate: Date
   completeDate: string
}

export interface PersistedSprintDto extends SprintDto {
   id: string
}
