import { prisma } from '#server/utils/db'

const SPRINT_WEBHOOK_EVENTS = new Set([
   'sprint_updated',
   'sprint_created',
   'sprint_deleted',
   'sprint_closed',
   'sprint_started',
])

interface JiraSprintPayload {
   id?: number | string
   state?: string
   name?: string
   createdDate?: string
   startDate?: string
   endDate?: string
   completeDate?: string
   originBoardId?: number | string
}

interface JiraSprintWebhookPayload {
   webhookEvent?: string
   sprint?: JiraSprintPayload
}

export async function syncSprintsFromWebhook(body: JiraSprintWebhookPayload) {
   if (!body.webhookEvent || !SPRINT_WEBHOOK_EVENTS.has(body.webhookEvent)) return

   const sprint = body.sprint
   if (!sprint?.id || !sprint.name || !sprint.createdDate) return

   const sprintJiraId = String(sprint.id)
   await prisma.sprint.upsert({
      where: { sprintJiraId },
      update: {
         name: sprint.name,
         startDate: toDateOrNull(sprint.startDate),
         endDate: toDateOrNull(sprint.endDate),
         state: sprint.state ?? null,
         originBoardId: sprint.originBoardId === undefined ? null : String(sprint.originBoardId),
         createdDate: toDateOrNull(sprint.createdDate) ?? new Date(),
         completeDate: sprint.completeDate ?? null,
      },
      create: {
         sprintJiraId,
         name: sprint.name,
         startDate: toDateOrNull(sprint.startDate),
         endDate: toDateOrNull(sprint.endDate),
         state: sprint.state ?? null,
         originBoardId: sprint.originBoardId === undefined ? null : String(sprint.originBoardId),
         createdDate: toDateOrNull(sprint.createdDate) ?? new Date(),
         completeDate: sprint.completeDate ?? null,
      },
   })
}

function toDateOrNull(value: string | undefined): Date | null {
   if (!value) return null

   const date = new Date(value)

   return Number.isNaN(date.getTime()) ? null : date
}
