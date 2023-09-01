/*
  Warnings:

  - You are about to drop the column `completed` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "completed",
ADD COLUMN     "isGameCompleted" BOOLEAN NOT NULL DEFAULT false;
