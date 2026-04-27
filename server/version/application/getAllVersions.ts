import { versionRepository } from '~/server/version/infrastructure/versionRepository'
import { toPersistedVersionDto } from '~/server/version/interface/versionMapper'

export async function getAllVersions() {
   const versions = await versionRepository.findAll()

   return versions.map(toPersistedVersionDto)
}
