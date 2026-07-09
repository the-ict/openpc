/*
  Warnings:

  - You are about to drop the `Cordinations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cordinations" DROP CONSTRAINT "Cordinations_case_model_id_fkey";

-- DropTable
DROP TABLE "Cordinations";
