import { productionHealthRepository } from '~/server/productionHealth/infrastructure/productionHealthRepository'
import { toPersistedProductionHealthDto } from '~/server/productionHealth/interface/productionHealthMapper'

export async function getLatestProductionHealth() {
   const productionHealth = await productionHealthRepository.findLatest()

   if (!productionHealth) {
      return null
   }

   return toPersistedProductionHealthDto(productionHealth)
}
