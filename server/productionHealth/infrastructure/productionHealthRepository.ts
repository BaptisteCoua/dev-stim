import type { ProductionHealth } from '~/server/productionHealth/domain/ProductionHealth'
import { prisma } from '~/server/utils/db'
import { fromPrismaProductionHealth } from '~/server/productionHealth/interface/productionHealthMapper'

export class ProductionHealthRepository {
   async create(productionHealth: ProductionHealth): Promise<ProductionHealth> {
      const persisted = await prisma.productionHealth.create({
         data: {
            ok: productionHealth.ok,
            status: productionHealth.status,
            statusText: productionHealth.statusText,
            durationMs: productionHealth.durationMs,
         },
      })

      return fromPrismaProductionHealth(persisted)
   }

   async findLatest(): Promise<ProductionHealth | null> {
      const productionHealth = await prisma.productionHealth.findFirst({
         orderBy: {
            createdAt: 'desc',
         },
      })

      if (!productionHealth) {
         return null
      }

      return fromPrismaProductionHealth(productionHealth)
   }
}

export const productionHealthRepository = new ProductionHealthRepository()
