export interface StoryDto {
   name: string
   storyPoints: number
   createdAt: string | Date
   priority: string
}

export interface PersistedStoryDto extends StoryDto {
   id: string
}
