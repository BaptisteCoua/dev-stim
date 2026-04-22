import type {
   JiraIssueWebhookPayload,
   JiraWebhookUser,
} from '~/server/userJira/interface/userJiraMapper'
import {
   fromJiraDetailToDomain,
   toDomainUserJira,
} from '~/server/userJira/interface/userJiraMapper'
import { jiraApiClient } from '~/server/userJira/infrastructure/jiraApiClient'
import { userJiraRepository } from '~/server/userJira/infrastructure/userJiraRepository'
import { teamRepository } from '~/server/userJira/infrastructure/teamRepository'

async function getOrCreateTeamId(teamName: string): Promise<string> {
   const existingTeam = await teamRepository.findByName(teamName)

   if (existingTeam) {
      return existingTeam.id
   }

   const createdTeam = await teamRepository.create(teamName)
   return createdTeam.id
}

async function checkUserExist(webhookUser: JiraWebhookUser, teamId: string): Promise<void> {
   const existing = await userJiraRepository.findByAccountId(webhookUser.accountId)

   if (existing) {
      const updatedUser = toDomainUserJira({
         ...existing.toDto(),
         id: existing.id,
      })

      await userJiraRepository.upsertByAccountId(updatedUser, teamId)
      return
   } else {
      await syncOneUser(webhookUser, teamId)
   }
}

async function syncOneUser(webhookUser: JiraWebhookUser, teamId: string): Promise<void> {
   const fullUser = await jiraApiClient.fetchUser(webhookUser.self)
   const user = fromJiraDetailToDomain(fullUser)

   await userJiraRepository.upsertByAccountId(user, teamId)
}

export async function syncJiraUsersFromWebhook(payload: JiraIssueWebhookPayload): Promise<void> {
   const issue = payload.issue

   if (!issue) {
      return
   }

   const { assignee, project } = issue.fields
   const teamId = await getOrCreateTeamId(project.name)

   const users = [assignee].filter(Boolean) as JiraWebhookUser[]
   const uniqueUsers = Array.from(new Map(users.map((user) => [user.accountId, user])).values())

   await Promise.all(uniqueUsers.map((user) => checkUserExist(user, teamId)))
}
