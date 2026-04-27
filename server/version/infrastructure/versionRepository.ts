import type { Version } from '~/server/version/domain/Version'
import { fromPrismaVersion } from '~/server/version/interface/versionMapper'
import { prisma } from '~/server/utils/db'

export class VersionRepository {
   async findAll(): Promise<Version[]> {
      const versions = await prisma.version.findMany()

      return versions.map(fromPrismaVersion)
   }
}

export const versionRepository = new VersionRepository()
