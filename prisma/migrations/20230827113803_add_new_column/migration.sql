/*
  Warnings:

  - You are about to drop the column `avgTime` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currentGameId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lastCompletedGameId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `completed` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeTaken` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "avgTime",
DROP COLUMN "score",
ADD COLUMN     "completed" BOOLEAN NOT NULL,
ADD COLUMN     "timeTaken" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentGameId" TEXT,
ADD COLUMN     "lastCompletedGameId" TEXT,
ADD COLUMN     "totalGames" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_currentGameId_key" ON "User"("currentGameId");

-- CreateIndex
CREATE UNIQUE INDEX "User_lastCompletedGameId_key" ON "User"("lastCompletedGameId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentGameId_fkey" FOREIGN KEY ("currentGameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lastCompletedGameId_fkey" FOREIGN KEY ("lastCompletedGameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
