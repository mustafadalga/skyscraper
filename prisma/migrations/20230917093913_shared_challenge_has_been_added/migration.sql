-- CreateTable
CREATE TABLE "SharedChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,

    CONSTRAINT "SharedChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedChallenge_id_key" ON "SharedChallenge"("id");

-- CreateIndex
CREATE INDEX "SharedChallenge_userId_gameId_idx" ON "SharedChallenge"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "SharedChallenge" ADD CONSTRAINT "SharedChallenge_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedChallenge" ADD CONSTRAINT "SharedChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
