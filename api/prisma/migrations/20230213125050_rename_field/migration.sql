/*
  Warnings:

  - You are about to drop the column `currentLives` on the `UserHabits` table. All the data in the column will be lost.
  - Added the required column `spentLives` to the `UserHabits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserHabits" DROP COLUMN "currentLives",
ADD COLUMN     "spentLives" INTEGER NOT NULL;
