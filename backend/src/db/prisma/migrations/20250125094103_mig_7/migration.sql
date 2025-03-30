/*
  Warnings:

  - You are about to drop the `MetaData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MetaData";

-- CreateTable
CREATE TABLE "FileDta" (
    "id" SERIAL NOT NULL,
    "docId" TEXT NOT NULL,
    "embeddingGenerated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileDta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileMetaData" (
    "id" SERIAL NOT NULL,
    "fileId" TEXT NOT NULL,
    "chunks" TEXT[],
    "vectorId" INTEGER[],

    CONSTRAINT "FileMetaData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileDta_docId_key" ON "FileDta"("docId");

-- AddForeignKey
ALTER TABLE "FileMetaData" ADD CONSTRAINT "FileMetaData_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "FileDta"("docId") ON DELETE RESTRICT ON UPDATE CASCADE;
