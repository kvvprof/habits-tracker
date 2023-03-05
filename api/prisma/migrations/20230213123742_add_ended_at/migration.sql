/*
  Warnings:

  - Added the required column `endedAt` to the `UserHabits` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `UserHabits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserHabitStatusEnum" AS ENUM ('progress', 'success', 'fail');

-- AlterTable
ALTER TABLE "UserHabits" ADD COLUMN     "endedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "UserHabitStatusEnum" NOT NULL;

-- DropEnum
DROP TYPE "HabitStatusEnum";
