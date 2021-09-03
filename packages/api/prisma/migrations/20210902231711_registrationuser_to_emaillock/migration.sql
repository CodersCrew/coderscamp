/*
  Warnings:

  - You are about to drop the `UserRegistration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserRegistration";

-- CreateTable
CREATE TABLE "RegisteredEmails" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredEmails.email_unique" ON "RegisteredEmails"("email");
