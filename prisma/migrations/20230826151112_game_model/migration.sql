-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avgTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT 'easy';

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "avgTime" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "boardSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE INDEX "Game_userId_idx" ON "Game"("userId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
