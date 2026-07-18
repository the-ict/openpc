/*
  Warnings:

  - Converting the implicit many-to-many relation between `Session` and `Model`
    into an explicit `SessionModel` join table so a model can occupy multiple
    slots (e.g. several RAM sticks) and we can store the slot index.
*/

-- AlterEnum (add RADIATOR)
ALTER TYPE "MODEL_TYPES" ADD VALUE 'RADIATOR';

-- CreateTable
CREATE TABLE "SessionModel" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "type" "MODEL_TYPES" NOT NULL,
    "slot" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SessionModel_pkey" PRIMARY KEY ("id")
);

-- Migrate existing links from the implicit relation into the explicit join.
-- slot/order default to 0; type is resolved from the Model row.
INSERT INTO "SessionModel" ("id", "sessionId", "modelId", "type", "slot", "order")
SELECT
    concat('sm_', md5(("A" || "B"))),
    "B" AS "sessionId",
    "A" AS "modelId",
    (SELECT "type" FROM "Model" WHERE "Model"."id" = "A"),
    0 AS "slot",
    0 AS "order"
FROM "_ModelToSession";

-- CreateIndex
CREATE UNIQUE INDEX "SessionModel_sessionId_modelId_slot_key" ON "SessionModel"("sessionId", "modelId", "slot");

-- AddForeignKey
ALTER TABLE "SessionModel" ADD CONSTRAINT "SessionModel_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SessionModel" ADD CONSTRAINT "SessionModel_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropTable (implicit m2m)
DROP TABLE "_ModelToSession";
