/*
  Warnings:

  - You are about to drop the `GameMove` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameMove" DROP CONSTRAINT "GameMove_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "isGameWon" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "GameMove";
