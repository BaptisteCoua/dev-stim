import { getLatestProductionHealth } from '~/server/productionHealth/application/getLatestProductionHealth'

export default defineEventHandler(async () => {
   return await getLatestProductionHealth()
})
