/*
  Warnings:

  - You are about to drop the column `statusId` on the `Sprint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sprint" DROP CONSTRAINT "Sprint_statusId_fkey";

-- DropIndex
DROP INDEX "Sprint_statusId_key";

-- AlterTable
ALTER TABLE "Sprint" DROP COLUMN "statusId";
