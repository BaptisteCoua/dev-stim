-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_sprintId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_userJiraId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_versionId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userJiraId_fkey";

-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "userJiraId" DROP NOT NULL,
ALTER COLUMN "statusId" DROP NOT NULL,
ALTER COLUMN "versionId" DROP NOT NULL,
ALTER COLUMN "sprintId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "userJiraId" DROP NOT NULL,
ALTER COLUMN "statusId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userJiraId_fkey" FOREIGN KEY ("userJiraId") REFERENCES "UserJira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userJiraId_fkey" FOREIGN KEY ("userJiraId") REFERENCES "UserJira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
