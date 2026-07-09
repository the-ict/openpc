/*
  Warnings:

  - You are about to drop the column `session_id` on the `Model` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_session_id_fkey";

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "session_id";

-- CreateTable
CREATE TABLE "_ModelToSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ModelToSession_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ModelToSession_B_index" ON "_ModelToSession"("B");

-- AddForeignKey
ALTER TABLE "_ModelToSession" ADD CONSTRAINT "_ModelToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelToSession" ADD CONSTRAINT "_ModelToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
