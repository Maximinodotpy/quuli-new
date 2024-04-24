-- AlterTable
ALTER TABLE `question` ADD COLUMN `questionnaireId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `questionnaire` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdById` VARCHAR(191) NOT NULL,
    `visibility` ENUM('PUBLIC', 'UNLISTED', 'PRIVATE') NOT NULL DEFAULT 'UNLISTED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuestionnaireEditors` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionnaireEditors_AB_unique`(`A`, `B`),
    INDEX `_QuestionnaireEditors_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuestionnaireMembers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionnaireMembers_AB_unique`(`A`, `B`),
    INDEX `_QuestionnaireMembers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_questionnaireId_fkey` FOREIGN KEY (`questionnaireId`) REFERENCES `questionnaire`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questionnaire` ADD CONSTRAINT `questionnaire_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionnaireEditors` ADD CONSTRAINT `_QuestionnaireEditors_A_fkey` FOREIGN KEY (`A`) REFERENCES `questionnaire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionnaireEditors` ADD CONSTRAINT `_QuestionnaireEditors_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionnaireMembers` ADD CONSTRAINT `_QuestionnaireMembers_A_fkey` FOREIGN KEY (`A`) REFERENCES `questionnaire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionnaireMembers` ADD CONSTRAINT `_QuestionnaireMembers_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
