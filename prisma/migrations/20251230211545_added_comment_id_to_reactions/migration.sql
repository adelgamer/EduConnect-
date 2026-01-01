-- AlterTable
ALTER TABLE `reaction` ADD COLUMN `commentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Reaction` ADD CONSTRAINT `Reaction_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
