-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_session_id_fkey";

-- AlterTable
ALTER TABLE "Model" ALTER COLUMN "session_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
