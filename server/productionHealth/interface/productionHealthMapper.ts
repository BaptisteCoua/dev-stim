import type { ProductionHealth as PrismaProductionHealth } from '~~/prisma/generated/prisma/client'
import { ProductionHealth } from '~/server/productionHealth/domain/ProductionHealth'
import type { ProductionHealthDto } from '~/server/productionHealth/domain/ProductionHealth'

export type PersistedProductionHealthDto = ProductionHealthDto & {
   id: string
   createdAt: Date
}

export function toPersistedProductionHealthDto(
   productionHealth: ProductionHealth,
): PersistedProductionHealthDto {
   if (!productionHealth.id || !productionHealth.createdAt) {
      throw new Error('Cannot build PersistedProductionHealthDto without id or createdAt')
   }

   return {
      id: productionHealth.id,
      ok: productionHealth.ok,
      status: productionHealth.status,
      statusText: productionHealth.statusText,
      durationMs: productionHealth.durationMs,
      createdAt: productionHealth.createdAt,
   }
}

export function fromPrismaProductionHealth(
   productionHealth: PrismaProductionHealth,
): ProductionHealth {
   return ProductionHealth.create({
      id: productionHealth.id,
      ok: productionHealth.ok,
      status: productionHealth.status,
      statusText: productionHealth.statusText,
      durationMs: productionHealth.durationMs,
      createdAt: productionHealth.createdAt,
   })
}
