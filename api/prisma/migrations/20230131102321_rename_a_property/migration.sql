/*
  Warnings:

  - You are about to drop the column `lives` on the `Habits` table. All the data in the column will be lost.
  - Added the required column `startLives` to the `Habits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Habits" DROP COLUMN "lives",
ADD COLUMN     "startLives" INTEGER NOT NULL;
