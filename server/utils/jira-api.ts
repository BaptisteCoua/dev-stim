interface JiraUserDetail {
   accountId: string
   displayName: string
   emailAddress: string
   avatarUrls: { '48x48': string }
}

function getJiraAuthHeader(): string {
   const username = process.env.JIRA_USERNAME
   const token = process.env.JIRA_API_TOKEN

   if (!username || !token) {
      throw new Error('Missing JIRA_USERNAME or JIRA_API_TOKEN environment variables')
   }

   return `Basic ${Buffer.from(`${username}:${token}`).toString('base64')}`
}

export async function fetchJiraUser(selfUrl: string): Promise<JiraUserDetail> {
   const response = await fetch(selfUrl, {
      headers: {
         Authorization: getJiraAuthHeader(),
         Accept: 'application/json',
      },
   })

   if (!response.ok) {
      throw new Error(`Jira API error: ${response.status} ${response.statusText}`)
   }

   return response.json() as Promise<JiraUserDetail>
}
