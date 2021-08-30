/*
  Warnings:

  - You are about to drop the `LearningMaterial` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[streamId,streamCategory]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "LearningMaterial";

-- CreateTable
CREATE TABLE "LearningMaterials" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "courseUserId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseProgress" (
    "id" TEXT NOT NULL,
    "courseUserId" TEXT NOT NULL,
    "learningMaterialsId" TEXT NOT NULL,
    "learningMaterialsCompletedCount" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningMaterials.courseUserId_unique" ON "LearningMaterials"("courseUserId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress.courseUserId_unique" ON "CourseProgress"("courseUserId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress.learningMaterialsId_unique" ON "CourseProgress"("learningMaterialsId");

-- CreateIndex
CREATE UNIQUE INDEX "streamName" ON "Event"("streamId", "streamCategory");
