-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "hasMistake" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHintRequired" BOOLEAN NOT NULL DEFAULT false;
