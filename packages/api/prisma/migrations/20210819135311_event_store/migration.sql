-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "streamId" UUID NOT NULL,
    "streamGroup" TEXT NOT NULL,
    "streamVersion" INTEGER NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,
    "globalOrder" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);
