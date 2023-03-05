/*
  Warnings:

  - You are about to drop the column `lives` on the `UserHabits` table. All the data in the column will be lost.
  - Added the required column `currentLives` to the `UserHabits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLives` to the `UserHabits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserHabits" DROP COLUMN "lives",
ADD COLUMN     "currentLives" INTEGER NOT NULL,
ADD COLUMN     "startLives" INTEGER NOT NULL;
