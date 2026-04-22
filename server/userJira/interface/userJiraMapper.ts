import type { UserJira as PrismaUserJira } from '~~/prisma/generated/prisma/client'
import type { PersistedUserJiraDto, UserJiraDto } from '~/shared/dto/UserJiraDto'
import { UserJira } from '~/server/userJira/domain/UserJira'

export interface JiraWebhookUser {
   self: string
   accountId: string
   displayName: string
   avatarUrls: { '48x48': string }
}

export interface JiraIssueWebhookPayload {
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

export interface JiraUserDetailDto {
   accountId: string
   displayName: string
   emailAddress: string
   avatarUrls: { '48x48': string }
}

export function toDomainUserJira(data: UserJiraDto & { id?: string }): UserJira {
   return UserJira.create(data)
}

export function toPersistedUserJiraDto(user: UserJira): PersistedUserJiraDto {
   if (!user.id) {
      throw new Error('Cannot build PersistedUserJiraDto without id')
   }

   return {
      id: user.id,
      ...user.toDto(),
   }
}

export function fromPrismaUserJira(user: PrismaUserJira): UserJira {
   return UserJira.create({
      id: user.id,
      accountId: user.accountId,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      teamId: user.teamId,
   })
}

export function fromJiraDetailToDomain(detail: JiraUserDetailDto, teamId: string): UserJira {
   return UserJira.create({
      accountId: detail.accountId,
      name: detail.displayName,
      email: detail.emailAddress,
      avatarUrl: detail.avatarUrls['48x48'],
      teamId,
   })
}
