-- CreateTable
CREATE TABLE "LearningMaterial" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "completedCount" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningMaterial.userId_unique" ON "LearningMaterial"("userId");
