import { getAllUserJiras } from '~/server/userJira/application/getAllUserJiras'

export default defineEventHandler(async () => {
   return await getAllUserJiras()
})
