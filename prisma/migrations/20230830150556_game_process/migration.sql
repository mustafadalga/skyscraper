/*
  Warnings:

  - Added the required column `filledGrid` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hiddenHintCount` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hints` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shownHints` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usedHiddenHintRights` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validGrid` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "filledGrid" TEXT NOT NULL,
ADD COLUMN     "hiddenHintCount" INTEGER NOT NULL,
ADD COLUMN     "hints" TEXT NOT NULL,
ADD COLUMN     "shownHints" TEXT NOT NULL,
ADD COLUMN     "usedHiddenHintRights" INTEGER NOT NULL,
ADD COLUMN     "validGrid" TEXT NOT NULL;
