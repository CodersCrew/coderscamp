/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `streamGroup` on the `Event` table. All the data in the column will be lost.
  - Added the required column `streamCategory` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `LearningMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "streamGroup",
ADD COLUMN     "streamCategory" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "streamId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LearningMaterial" ADD COLUMN     "version" INTEGER NOT NULL;
