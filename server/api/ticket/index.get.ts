import { getAllTicket } from '#server/ticket/application/getAllTicket'

export default defineEventHandler(async () => {
   return await getAllTicket()
})
