/*
  Warnings:

  - Made the column `duration` on table `Habits` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lives` on table `Habits` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `UserHabits` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `UserHabits` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lives` on table `UserHabits` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "UserHabits_title_key";

-- AlterTable
ALTER TABLE "Habits" ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "lives" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserHabits" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "lives" SET NOT NULL;
