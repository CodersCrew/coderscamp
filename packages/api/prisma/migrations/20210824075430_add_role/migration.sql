-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "AuthUser" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'User';
