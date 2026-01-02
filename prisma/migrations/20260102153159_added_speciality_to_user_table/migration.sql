-- AlterTable
ALTER TABLE `faculty` MODIFY `shortName` VARCHAR(12) NULL,
    MODIFY `description` VARCHAR(500) NULL,
    MODIFY `website` VARCHAR(2048) NULL;

-- AlterTable
ALTER TABLE `specialty` MODIFY `shortName` VARCHAR(12) NULL,
    MODIFY `description` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `university` MODIFY `shortName` VARCHAR(12) NULL,
    MODIFY `description` VARCHAR(500) NULL,
    MODIFY `website` VARCHAR(2048) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `specialityId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_specialityId_fkey` FOREIGN KEY (`specialityId`) REFERENCES `Specialty`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
