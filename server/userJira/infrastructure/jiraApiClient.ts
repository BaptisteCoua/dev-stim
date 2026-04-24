import type { JiraUserDetailDto } from '~/server/userJira/interface/userJiraMapper'

function getJiraAuthHeader(): string {
   const username = process.env.JIRA_USERNAME
   const token = process.env.JIRA_API_TOKEN

   if (!username || !token) {
      throw new Error('Missing JIRA_USERNAME or JIRA_API_TOKEN environment variables')
   }

   return `Basic ${Buffer.from(`${username}:${token}`).toString('base64')}`
}

export class JiraApiClient {
   async fetchUser(selfUrl: string): Promise<JiraUserDetailDto> {
      const response = await fetch(selfUrl, {
         headers: {
            Authorization: getJiraAuthHeader(),
            Accept: 'application/json',
         },
      })

      if (!response.ok) {
         throw new Error(`Jira API error: ${response.status} ${response.statusText}`)
      }

      return response.json() as Promise<JiraUserDetailDto>
   }
}

export const jiraApiClient = new JiraApiClient()
