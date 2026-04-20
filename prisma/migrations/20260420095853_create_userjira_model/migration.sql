-- CreateTable
CREATE TABLE "UserJira" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "UserJira_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserJira" ADD CONSTRAINT "UserJira_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
