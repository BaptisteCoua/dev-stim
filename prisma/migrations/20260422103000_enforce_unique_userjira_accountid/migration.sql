-- Deduplicate existing Jira users by accountId before adding unique index.
-- Keeps the lexicographically smallest id per accountId.
DELETE FROM "UserJira" AS dupe
USING "UserJira" AS keep
WHERE dupe."accountId" = keep."accountId"
  AND dupe."id" > keep."id";

-- Required by Prisma upsert(where: { accountId }) that generates ON CONFLICT ("accountId").
CREATE UNIQUE INDEX IF NOT EXISTS "UserJira_accountId_key" ON "UserJira"("accountId");
