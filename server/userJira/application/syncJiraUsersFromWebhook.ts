import type {
   JiraIssueWebhookPayload,
   JiraWebhookUser,
} from '~/server/userJira/interface/userJiraMapper'
import { fromJiraDetailToDomain } from '~/server/userJira/interface/userJiraMapper'
import { jiraApiClient } from '~/server/userJira/infrastructure/jiraApiClient'
import { teamRepository } from '~/server/userJira/infrastructure/teamRepository'
import { userJiraRepository } from '~/server/userJira/infrastructure/userJiraRepository'

async function resolveTeamId(projectName: string): Promise<string> {
   const existing = await teamRepository.findByName(projectName)
   if (existing) {
      return existing.id
   }

   const created = await teamRepository.create(projectName)
   return created.id
}

async function syncOneUser(webhookUser: JiraWebhookUser, teamId: string): Promise<void> {
   const fullUser = await jiraApiClient.fetchUser(webhookUser.self)
   const user = fromJiraDetailToDomain(fullUser, teamId)

   await userJiraRepository.upsertByAccountId(user)
}

export async function syncJiraUsersFromWebhook(payload: JiraIssueWebhookPayload): Promise<void> {
   const issue = payload.issue

   if (!issue) {
      return
   }

   const { assignee, project } = issue.fields

   const teamId = await resolveTeamId(project.name)

   const users = [assignee].filter(Boolean) as JiraWebhookUser[]
   const uniqueUsers = Array.from(new Map(users.map((user) => [user.accountId, user])).values())

   await Promise.all(uniqueUsers.map((user) => syncOneUser(user, teamId)))
}
