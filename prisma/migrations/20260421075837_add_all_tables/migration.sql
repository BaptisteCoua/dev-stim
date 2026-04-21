/*
  Warnings:

  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `role_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- DropForeignKey
ALTER TABLE "UserJira" DROP CONSTRAINT "UserJira_teamId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP
COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserJira"
ALTER
COLUMN "teamId" TYPE UUID USING ("teamId"::uuid);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role_id",
ADD COLUMN     "roleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Ticket"
(
    "id"          TEXT         NOT NULL,
    "userJiraId"  TEXT         NOT NULL,
    "statusId"    TEXT         NOT NULL,
    "name"        TEXT         NOT NULL,
    "priority"    TEXT         NOT NULL,
    "createdAt"   TIMESTAMP(3) NOT NULL,
    "ticketPoint" INTEGER      NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story"
(
    "id"          TEXT         NOT NULL,
    "userJiraId"  TEXT         NOT NULL,
    "statusId"    TEXT         NOT NULL,
    "versionId"   TEXT         NOT NULL,
    "sprintId"    TEXT         NOT NULL,
    "name"        TEXT         NOT NULL,
    "storyPoints" INTEGER      NOT NULL,
    "createdAt"   TIMESTAMP(3) NOT NULL,
    "priority"    TEXT         NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status"
(
    "id"    TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version"
(
    "id"          TEXT         NOT NULL,
    "statusId"    TEXT         NOT NULL,
    "name"        TEXT         NOT NULL,
    "description" TEXT         NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "startDate"   TIMESTAMP(3) NOT NULL,
    "progress"    TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprint"
(
    "id"            TEXT         NOT NULL,
    "statusId"      TEXT         NOT NULL,
    "name"          TEXT         NOT NULL,
    "startDate"     TIMESTAMP(3) NOT NULL,
    "endDate"       TIMESTAMP(3) NOT NULL,
    "state"         TEXT         NOT NULL,
    "originBoardId" TEXT         NOT NULL,
    "createdDate"   TIMESTAMP(3) NOT NULL,
    "completeDate"  TEXT         NOT NULL,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StoryToTicket"
(
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StoryToTicket_AB_pkey" PRIMARY KEY ("A", "B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_userJiraId_key" ON "Ticket" ("userJiraId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_statusId_key" ON "Ticket" ("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "Story_userJiraId_key" ON "Story" ("userJiraId");

-- CreateIndex
CREATE UNIQUE INDEX "Story_statusId_key" ON "Story" ("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "Story_versionId_key" ON "Story" ("versionId");

-- CreateIndex
CREATE UNIQUE INDEX "Story_sprintId_key" ON "Story" ("sprintId");

-- CreateIndex
CREATE UNIQUE INDEX "Version_statusId_key" ON "Version" ("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_statusId_key" ON "Sprint" ("statusId");

-- CreateIndex
CREATE INDEX "_StoryToTicket_B_index" ON "_StoryToTicket" ("B");

-- AddForeignKey
ALTER TABLE "User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJira"
    ADD CONSTRAINT "UserJira_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket"
    ADD CONSTRAINT "Ticket_userJiraId_fkey" FOREIGN KEY ("userJiraId") REFERENCES "UserJira" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket"
    ADD CONSTRAINT "Ticket_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story"
    ADD CONSTRAINT "Story_userJiraId_fkey" FOREIGN KEY ("userJiraId") REFERENCES "UserJira" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story"
    ADD CONSTRAINT "Story_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story"
    ADD CONSTRAINT "Story_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story"
    ADD CONSTRAINT "Story_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version"
    ADD CONSTRAINT "Version_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint"
    ADD CONSTRAINT "Sprint_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoryToTicket"
    ADD CONSTRAINT "_StoryToTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "Story" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoryToTicket"
    ADD CONSTRAINT "_StoryToTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
