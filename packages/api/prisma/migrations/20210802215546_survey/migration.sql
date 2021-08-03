-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthYear" INTEGER,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "isStudent" BOOLEAN;

-- CreateTable
CREATE TABLE "Survey" (
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "alreadyTookCourse" BOOLEAN NOT NULL,
    "reasonForRetakingCourse" TEXT,
    "expectations" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "uniques" TEXT NOT NULL,
    "plans" TEXT NOT NULL,
    "unavailability" TEXT NOT NULL,
    "averageTime" INTEGER NOT NULL,
    "associatedWords" TEXT[],
    "courseInformationSource" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey.userId_unique" ON "Survey"("userId");

-- AddForeignKey
ALTER TABLE "Survey" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
