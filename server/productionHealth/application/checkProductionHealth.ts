import { ProductionHealth } from '~/server/productionHealth/domain/ProductionHealth'
import { productionHealthRepository } from '~/server/productionHealth/infrastructure/productionHealthRepository'

const PRODUCTION_URL = 'https://hypervision.fr'
const PRODUCTION_HEALTH_TIMEOUT_MS = 10_000

export async function checkProductionHealth(): Promise<void> {
   const startedAt = Date.now()
   const controller = new AbortController()
   const timeout = setTimeout(() => controller.abort(), PRODUCTION_HEALTH_TIMEOUT_MS)

   try {
      const response = await fetch(PRODUCTION_URL, {
         method: 'GET',
         headers: {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'dev-stim-cron/1.0',
         },
         signal: controller.signal,
      })

      await productionHealthRepository.create(
         ProductionHealth.create({
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            durationMs: Date.now() - startedAt,
         }),
      )
   } catch (err) {
      const statusText = err instanceof Error ? err.message : 'Unknown error'

      await productionHealthRepository.create(
         ProductionHealth.create({
            ok: false,
            status: 0,
            statusText,
            durationMs: Date.now() - startedAt,
         }),
      )

      throw err
   } finally {
      clearTimeout(timeout)
   }
}
