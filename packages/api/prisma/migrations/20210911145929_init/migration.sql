-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT E'https://www.gravatar.com/avatar?d=mp',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'User',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredEmails" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "LearningMaterials" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "courseUserId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,
    "streamCategory" TEXT NOT NULL,
    "streamVersion" INTEGER NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,
    "globalOrder" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseProgress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "courseUserId" TEXT,
    "learningMaterialsId" TEXT NOT NULL,
    "learningMaterialsCompletedTasks" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile.email_unique" ON "UserProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser.email_unique" ON "AuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredEmails.email_unique" ON "RegisteredEmails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LearningMaterials.courseUserId_unique" ON "LearningMaterials"("courseUserId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress.courseUserId_unique" ON "CourseProgress"("courseUserId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress.learningMaterialsId_unique" ON "CourseProgress"("learningMaterialsId");
