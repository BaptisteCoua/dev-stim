/*
  Warnings:

  - A unique constraint covering the columns `[sprintJiraId]` on the table `Sprint` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sprintJiraId` to the `Sprint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sprint" ADD COLUMN     "sprintJiraId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_sprintJiraId_key" ON "Sprint"("sprintJiraId");
