/*
  Warnings:

  - You are about to drop the column `userId` on the `FileDta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FileDta" DROP CONSTRAINT "FileDta_userId_fkey";

-- AlterTable
ALTER TABLE "FileDta" DROP COLUMN "userId";
