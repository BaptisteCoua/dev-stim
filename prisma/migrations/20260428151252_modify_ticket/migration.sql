/*
  Warnings:

  - You are about to drop the column `ticketPoint` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticketId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticketId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketPoints` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ticketPoint",
ADD COLUMN     "ticketId" TEXT NOT NULL,
ADD COLUMN     "ticketPoints" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketId_key" ON "Ticket"("ticketId");
