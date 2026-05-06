import { prisma } from '#server/utils/db'
import type { JiraIssueWebhookPayload } from '~/server/userJira/interface/userJiraMapper'

export async function syncVersionsFromWebhook(body: JiraIssueWebhookPayload) {
   const fixVersion = body.issue?.fields?.fixVersions?.[0]
   if (!fixVersion?.id || !fixVersion.name) return

   const versionJiraId = String(fixVersion.id)

   await prisma.version.upsert({
      where: { versionJiraId },
      update: {
         name: fixVersion.name,
         description: fixVersion.description ?? '',
         releaseDate: toDateOrNow(fixVersion.releaseDate),
         startDate: toDateOrNow(fixVersion.startDate),
         progress: toDateOrNow(fixVersion.progress),
         archived: fixVersion.archived ?? false,
         released: fixVersion.released ?? false,
         overdue: fixVersion.overdue ?? false,
      },
      create: {
         versionJiraId,
         name: fixVersion.name,
         description: fixVersion.description ?? '',
         releaseDate: toDateOrNow(fixVersion.releaseDate),
         startDate: toDateOrNow(fixVersion.startDate),
         progress: toDateOrNow(fixVersion.progress),
         archived: fixVersion.archived ?? false,
         released: fixVersion.released ?? false,
         overdue: fixVersion.overdue ?? false,
      },
   })
}

function toDateOrNow(value: string | undefined): Date {
   if (!value) return new Date()
   const date = new Date(value)
   return Number.isNaN(date.getTime()) ? new Date() : date
}
