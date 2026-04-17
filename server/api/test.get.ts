import { prisma } from "../utils/db";

export default defineEventHandler(async () => {
    return prisma.user.findMany();
});