export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   console.log('-------------------------------------------------')
   console.log('-------------------------------------------------')
   console.log('Webhook reçu:', body)

   // TODO: vérifier signature si nécessaire

   return {
      status: 'ok',
   }
})
