-- CreateTable
CREATE TABLE "GameMove" (
    "id" TEXT NOT NULL,
    "cell" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "GameMove_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameMove_id_key" ON "GameMove"("id");

-- CreateIndex
CREATE INDEX "GameMove_gameId_idx" ON "GameMove"("gameId");

-- AddForeignKey
ALTER TABLE "GameMove" ADD CONSTRAINT "GameMove_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
