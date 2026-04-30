/*
  Warnings:

  - You are about to drop the column `statusId` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_statusId_fkey";

-- DropIndex
DROP INDEX "Story_statusId_key";

-- DropIndex
DROP INDEX "Ticket_statusId_key";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "statusId",
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "statusId",
ADD COLUMN     "status" TEXT;

-- DropTable
DROP TABLE "Status";
