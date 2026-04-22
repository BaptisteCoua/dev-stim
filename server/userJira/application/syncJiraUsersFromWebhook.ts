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

async function checkUserExist(webhookUser: JiraWebhookUser): Promise<void> {
   const existing = await userJiraRepository.findByAccountId(webhookUser.accountId)

   if (existing) {
      const updatedTeamUser = toDomainUserJira({
         ...existing.toDto(),
         id: existing.id,
      })

      await userJiraRepository.upsertByAccountId(updatedTeamUser)
      return
   } else {
      await syncOneUser(webhookUser)
   }
}

async function syncOneUser(webhookUser: JiraWebhookUser): Promise<void> {
   const fullUser = await jiraApiClient.fetchUser(webhookUser.self)
   const user = fromJiraDetailToDomain(fullUser)

   await userJiraRepository.upsertByAccountId(user)
}

export async function syncJiraUsersFromWebhook(payload: JiraIssueWebhookPayload): Promise<void> {
   const issue = payload.issue

   if (!issue) {
      return
   }

   const { assignee } = issue.fields

   const users = [assignee].filter(Boolean) as JiraWebhookUser[]
   const uniqueUsers = Array.from(new Map(users.map((user) => [user.accountId, user])).values())

   await Promise.all(uniqueUsers.map((user) => checkUserExist(user)))
}
