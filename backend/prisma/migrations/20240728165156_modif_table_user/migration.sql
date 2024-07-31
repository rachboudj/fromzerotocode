/*
  Warnings:

  - You are about to drop the column `anciennete` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `anciennete`,
    DROP COLUMN `phone`;
