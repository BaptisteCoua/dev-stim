import { getAllSprints } from '~/server/sprint/application/getAllSprints'

export default defineEventHandler(async () => {
   return await getAllSprints()
})
