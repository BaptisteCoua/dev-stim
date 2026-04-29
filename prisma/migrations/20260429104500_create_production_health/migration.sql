-- CreateTable
CREATE TABLE "production_health" (
    "id" TEXT NOT NULL,
    "ok" BOOLEAN NOT NULL,
    "status" INTEGER NOT NULL,
    "statusText" TEXT NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "production_health_pkey" PRIMARY KEY ("id")
);
