/*
  Warnings:

  - You are about to drop the column `boardSize` on the `Game` table. All the data in the column will be lost.
  - Added the required column `dimension` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "boardSize",
ADD COLUMN     "dimension" INTEGER NOT NULL,
ALTER COLUMN "completed" SET DEFAULT false;
