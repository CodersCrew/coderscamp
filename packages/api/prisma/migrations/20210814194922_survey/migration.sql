-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthYear" INTEGER,
ADD COLUMN     "educationStatus" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "town" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "fullName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Survey" (
    "userId" INTEGER NOT NULL,
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
