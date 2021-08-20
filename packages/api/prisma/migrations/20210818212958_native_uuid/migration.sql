/*
  Warnings:

  - The primary key for the `LearningMaterial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LearningMaterial` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `LearningMaterial` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `LearningMaterial` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "LearningMaterial" DROP CONSTRAINT "LearningMaterial_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "LearningMaterial.userId_unique" ON "LearningMaterial"("userId");
