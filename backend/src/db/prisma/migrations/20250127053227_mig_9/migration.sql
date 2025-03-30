/*
  Warnings:

  - You are about to drop the column `chunks` on the `FileMetaData` table. All the data in the column will be lost.
  - Added the required column `chunk` to the `FileMetaData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page` to the `FileMetaData` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fileId` on the `FileMetaData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "FileMetaData" DROP CONSTRAINT "FileMetaData_fileId_fkey";

-- AlterTable
ALTER TABLE "FileMetaData" DROP COLUMN "chunks",
ADD COLUMN     "chunk" TEXT NOT NULL,
ADD COLUMN     "page" INTEGER NOT NULL,
DROP COLUMN "fileId",
ADD COLUMN     "fileId" INTEGER NOT NULL,
ALTER COLUMN "vectorId" SET NOT NULL,
ALTER COLUMN "vectorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "FileMetaData" ADD CONSTRAINT "FileMetaData_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "FileDta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
