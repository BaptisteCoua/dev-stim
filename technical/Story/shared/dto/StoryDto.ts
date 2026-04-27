export interface StoryDto {
   storyId: string
   name: string
   storyPoints: number
   createdAt: string | Date
   priority: string
}

export interface PersistedStoryDto extends StoryDto {
   id: string
}
