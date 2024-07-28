/*
  Warnings:

  - You are about to drop the column `duration` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `duration`;

-- CreateTable
CREATE TABLE `Tutorial` (
    `id_tutorial` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `id_course` INTEGER NOT NULL,

    UNIQUE INDEX `Tutorial_id_tutorial_key`(`id_tutorial`),
    PRIMARY KEY (`id_tutorial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tutorial` ADD CONSTRAINT `Tutorial_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;
