/*
  Warnings:

  - You are about to drop the `DocumentChunk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DocumentChunk";

-- CreateTable
CREATE TABLE "MetaData" (
    "id" SERIAL NOT NULL,
    "docId" TEXT NOT NULL,
    "chunkText" TEXT NOT NULL,
    "vectorId" TEXT,
    "embeddingGenerated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);
