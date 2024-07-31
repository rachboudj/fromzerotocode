/*
  Warnings:

  - You are about to alter the column `progress` on the `UserCourse` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `UserCourse` MODIFY `progress` INTEGER NOT NULL;
