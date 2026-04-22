import { jiraUserRepository } from '../../repositories/jira-user.repository'
import { teamRepository } from '../../repositories/team.repository'
import { fetchJiraUser } from '../../utils/jira-api'

interface JiraWebhookUser {
   self: string
   accountId: string
   displayName: string
   avatarUrls: { '48x48': string }
}

interface JiraIssueWebhookPayload {
   webhookEvent: string
   issue?: {
      fields: {
         assignee?: JiraWebhookUser | null
         reporter?: JiraWebhookUser | null
         project: {
            id: string
            name: string
         }
      }
   }
}

async function resolveTeamId(projectName: string): Promise<string> {
   const existing = await teamRepository.findByName(projectName)
   if (existing) return existing.id

   const created = await teamRepository.create(projectName)
   return created.id
}

async function syncUser(webhookUser: JiraWebhookUser, teamId: string): Promise<void> {
   const fullUser = await fetchJiraUser(webhookUser.self)

   await jiraUserRepository.upsertByAccountId({
      accountId: fullUser.accountId,
      name: fullUser.displayName,
      email: fullUser.emailAddress,
      avatarUrl: fullUser.avatarUrls['48x48'],
      teamId,
   })
}

export async function syncJiraUsersFromWebhook(payload: JiraIssueWebhookPayload): Promise<void> {
   const { issue } = payload

   if (!issue) return

   const { assignee, reporter, project } = issue.fields
   const teamId = await resolveTeamId(project.name)

   const users = [assignee, reporter].filter(Boolean) as JiraWebhookUser[]
   await Promise.all(users.map((user) => syncUser(user, teamId)))
}
