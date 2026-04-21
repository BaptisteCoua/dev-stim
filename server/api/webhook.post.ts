export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   // TODO: vérifier signature si nécessaire

   return {
      body: body,
      status: 'ok',
   }
})
