/*
  Warnings:

  - You are about to drop the column `completed` on the `UserHabits` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Habits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `status` to the `UserHabits` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `UserHabits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HabitEnum" AS ENUM ('good', 'bad');

-- CreateEnum
CREATE TYPE "HabitStatusEnum" AS ENUM ('progress', 'success', 'fail');

-- AlterTable
ALTER TABLE "Habits" DROP COLUMN "type",
ADD COLUMN     "type" "HabitEnum" NOT NULL;

-- AlterTable
ALTER TABLE "UserHabits" DROP COLUMN "completed",
ADD COLUMN     "status" "HabitStatusEnum" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "HabitEnum" NOT NULL;

-- DropEnum
DROP TYPE "HabitType";
