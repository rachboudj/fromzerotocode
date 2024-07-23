-- CreateTable
CREATE TABLE `Course` (
    `id_course` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `url` VARCHAR(250) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `id_category` INTEGER NOT NULL,

    UNIQUE INDEX `Course_id_course_key`(`id_course`),
    PRIMARY KEY (`id_course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `surname` VARCHAR(250) NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    `email` VARCHAR(250) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `last_connexion` DATETIME(3) NULL,
    `anciennete` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_user_key`(`id_user`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_id_role_key`(`id_role`),
    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `id_user` INTEGER NOT NULL,
    `id_role` INTEGER NOT NULL,

    UNIQUE INDEX `UserRole_id_user_id_role_key`(`id_user`, `id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `description` VARCHAR(191) NULL,
    `statut` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_id_category_key`(`id_category`),
    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCourse` (
    `id_user` INTEGER NOT NULL,
    `id_course` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `progress` INTEGER NOT NULL,

    UNIQUE INDEX `UserCourse_id_user_id_course_key`(`id_user`, `id_course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `Category`(`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;
