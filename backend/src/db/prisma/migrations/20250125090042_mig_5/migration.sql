/*
  Warnings:

  - The `vectorId` column on the `MetaData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MetaData" DROP COLUMN "vectorId",
ADD COLUMN     "vectorId" INTEGER[];
