/*
  Warnings:

  - You are about to drop the column `statusId` on the `Version` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[versionJiraId]` on the table `Version` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `archived` to the `Version` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overdue` to the `Version` table without a default value. This is not possible if the table is not empty.
  - Added the required column `released` to the `Version` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionJiraId` to the `Version` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Version" DROP CONSTRAINT "Version_statusId_fkey";

-- DropIndex
DROP INDEX "Version_statusId_key";

-- AlterTable
ALTER TABLE "Version" DROP COLUMN "statusId",
ADD COLUMN     "archived" BOOLEAN NOT NULL,
ADD COLUMN     "overdue" BOOLEAN NOT NULL,
ADD COLUMN     "released" BOOLEAN NOT NULL,
ADD COLUMN     "versionJiraId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Version_versionJiraId_key" ON "Version"("versionJiraId");
