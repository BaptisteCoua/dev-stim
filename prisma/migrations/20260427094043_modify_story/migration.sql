/*
  Warnings:

  - A unique constraint covering the columns `[storyId]` on the table `Story` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storyId` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "storyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Story_storyId_key" ON "Story"("storyId");
