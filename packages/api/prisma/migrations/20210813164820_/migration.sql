/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "birthYear" INTEGER,
ADD COLUMN     "educationStatus" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "town" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "fullName" DROP NOT NULL,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Survey" (
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prevParticipation" TEXT NOT NULL,
    "reasonForRetakingCourse" TEXT,
    "expectations" TEXT NOT NULL,
    "experience" TEXT,
    "reasonToAccept" TEXT NOT NULL,
    "plans" TEXT NOT NULL,
    "absencePeriod" TEXT NOT NULL,
    "averageTime" INTEGER NOT NULL,
    "associatedWords" TEXT[],
    "courseInformationSource" TEXT[],
    "marketingAccept" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey.userId_unique" ON "Survey"("userId");

-- AddForeignKey
ALTER TABLE "Survey" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
