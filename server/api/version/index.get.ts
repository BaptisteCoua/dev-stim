import { getAllVersions } from '~/server/version/application/getAllVersions'

export default defineEventHandler(async () => {
   return await getAllVersions()
})
