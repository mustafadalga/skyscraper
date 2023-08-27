/*
  Warnings:

  - The values [EASY,MEDIUM,HARD] on the enum `Difficulty` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `difficulty` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Difficulty_new" AS ENUM ('easy', 'medium', 'hard');
ALTER TABLE "User" ALTER COLUMN "difficulty" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "difficulty" TYPE "Difficulty_new" USING ("difficulty"::text::"Difficulty_new");
ALTER TABLE "Game" ALTER COLUMN "difficulty" TYPE "Difficulty_new" USING ("difficulty"::text::"Difficulty_new");
ALTER TYPE "Difficulty" RENAME TO "Difficulty_old";
ALTER TYPE "Difficulty_new" RENAME TO "Difficulty";
DROP TYPE "Difficulty_old";
ALTER TABLE "User" ALTER COLUMN "difficulty" SET DEFAULT 'easy';
COMMIT;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "difficulty" SET DEFAULT 'easy';
