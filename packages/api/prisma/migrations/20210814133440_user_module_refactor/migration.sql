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
