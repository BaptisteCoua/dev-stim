/*
  Warnings:

  - You are about to drop the column `date` on the `production_health` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Story_sprintId_key";

-- DropIndex
DROP INDEX "Story_versionId_key";

-- AlterTable
ALTER TABLE "production_health" DROP COLUMN "date";
