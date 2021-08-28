/*
  Warnings:

  - The primary key for the `CourseProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `learningMaterialsCompletedCount` on the `CourseProgress` table. All the data in the column will be lost.
  - The `id` column on the `CourseProgress` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `learningMaterialsCompletedTasks` to the `CourseProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseProgress" DROP CONSTRAINT "CourseProgress_pkey",
DROP COLUMN "learningMaterialsCompletedCount",
ADD COLUMN     "learningMaterialsCompletedTasks" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD PRIMARY KEY ("id");
