export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   console.log('Webhook reçu:', body)

   // TODO: vérifier signature si nécessaire

   return {
      status: 'ok',
   }
})
