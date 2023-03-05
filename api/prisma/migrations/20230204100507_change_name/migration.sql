/*
  Warnings:

  - Changed the type of `type` on the `Habits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `UserHabits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HabitTypeEnum" AS ENUM ('good', 'bad');

-- AlterTable
ALTER TABLE "Habits" DROP COLUMN "type",
ADD COLUMN     "type" "HabitTypeEnum" NOT NULL;

-- AlterTable
ALTER TABLE "UserHabits" DROP COLUMN "type",
ADD COLUMN     "type" "HabitTypeEnum" NOT NULL;

-- DropEnum
DROP TYPE "HabitEnum";
