/*
  Warnings:

  - You are about to drop the column `lastCompletedGameId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lastCompletedGameId_fkey";

-- DropIndex
DROP INDEX "User_lastCompletedGameId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastCompletedGameId";
