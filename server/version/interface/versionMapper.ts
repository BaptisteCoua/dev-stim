import type { Version as PrismaVersion } from '~~/prisma/generated/prisma/client'
import type { PersistedVersionDto, VersionDto } from '~/functional/Version/shared/dto/versionDto'
import { Version } from '~/server/version/domain/Version'

export function toDomainVersion(data: VersionDto & { id?: string }): Version {
   return Version.create(data)
}

export function toPersistedVersionDto(version: Version): PersistedVersionDto {
   if (!version.id) {
      throw new Error('Cannot build PersistedVersionDto without id')
   }

   return {
      id: version.id,
      ...version.toDto(),
   }
}

export function fromPrismaVersion(version: PrismaVersion): Version {
   return Version.create({
      id: version.id,
      name: version.name,
      description: version.description,
      releaseDate: version.releaseDate,
      startDate: version.startDate,
      progress: version.progress,
   })
}
