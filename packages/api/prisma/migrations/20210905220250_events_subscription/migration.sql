-- CreateTable
CREATE TABLE "EventsSubscription" (
    "id" TEXT NOT NULL,
    "currentPosition" INTEGER NOT NULL,
    "fromPosition" INTEGER NOT NULL,
    "eventTypes" TEXT[],

    PRIMARY KEY ("id")
);
