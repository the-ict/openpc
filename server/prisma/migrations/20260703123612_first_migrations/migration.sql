-- CreateEnum
CREATE TYPE "MODEL_TYPES" AS ENUM ('CPU', 'GPU', 'MOTHER_BOARD', 'RAM', 'STORAGE', 'POWER_SUPPLY', 'COOLER', 'CASE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "google_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MODEL_TYPES" NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "model_file" TEXT NOT NULL,
    "model_code_file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "session_id" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cordinations" (
    "id" TEXT NOT NULL,
    "cpu_cordination_x" TEXT NOT NULL,
    "cpu_cordination_y" TEXT NOT NULL,
    "cpu_cordination_z" TEXT NOT NULL,
    "gpu_cordination_x" TEXT NOT NULL,
    "gpu_cordination_y" TEXT NOT NULL,
    "gpu_cordination_z" TEXT NOT NULL,
    "mother_board_cordination_x" TEXT NOT NULL,
    "mother_board_cordination_y" TEXT NOT NULL,
    "mother_board_cordination_z" TEXT NOT NULL,
    "ram_cordination_x" TEXT NOT NULL,
    "ram_cordination_y" TEXT NOT NULL,
    "ram_cordination_z" TEXT NOT NULL,
    "storage_cordination_x" TEXT NOT NULL,
    "storage_cordination_y" TEXT NOT NULL,
    "storage_cordination_z" TEXT NOT NULL,
    "power_supply_cordination_x" TEXT NOT NULL,
    "power_supply_cordination_y" TEXT NOT NULL,
    "power_supply_cordination_z" TEXT NOT NULL,
    "cooler_cordination_x" TEXT NOT NULL,
    "cooler_cordination_y" TEXT NOT NULL,
    "cooler_cordination_z" TEXT NOT NULL,
    "case_model_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cordinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cordinations_case_model_id_key" ON "Cordinations"("case_model_id");

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cordinations" ADD CONSTRAINT "Cordinations_case_model_id_fkey" FOREIGN KEY ("case_model_id") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
