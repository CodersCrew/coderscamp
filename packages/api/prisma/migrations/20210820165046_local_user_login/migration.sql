/*
  Warnings:

  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User.githubId_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubId",
ALTER COLUMN "image" SET DEFAULT E'https://www.gravatar.com/avatar?d=mp';

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRegistration" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser.email_unique" ON "AuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRegistration.email_unique" ON "UserRegistration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
