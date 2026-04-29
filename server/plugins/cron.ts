export default defineNitroPlugin(async () => {
   const { schedule } = await import('node-cron')

   console.log('Cron lancé')

   schedule('*/5 * * * * *', async () => {
      console.log('Exécution toutes les 5 minutes')

      try {
         await maFonction()
      } catch (err) {
         console.error('Erreur dans le cron:', err)
      }
   })
})

async function maFonction() {
   console.log('Ma fonction est exécutée')
}
