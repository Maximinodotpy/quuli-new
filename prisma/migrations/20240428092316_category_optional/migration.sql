-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_categoryId_fkey`;

-- AlterTable
ALTER TABLE `question` MODIFY `categoryId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
