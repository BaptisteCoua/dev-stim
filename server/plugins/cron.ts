import { checkProductionHealth } from '~/server/productionHealth/application/checkProductionHealth'

export default defineNitroPlugin(async () => {
   const { schedule } = await import('node-cron')

   console.log('Cron lancé')
   if (!import.meta.dev) {
      schedule('*/5 * * * *', async () => {
         console.log('Exécution toutes les 5 minutes')

         try {
            await checkProductionHealth()
         } catch (err) {
            console.error('Erreur dans le cron:', err)
         }
      })
   }
})
