/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `university` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,shortName,deletedAt]` on the table `University` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `University_name_key` ON `university`;

-- DropIndex
DROP INDEX `University_shortName_key` ON `university`;

-- AlterTable
ALTER TABLE `university` DROP COLUMN `isDeleted`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `University_name_shortName_deletedAt_key` ON `University`(`name`, `shortName`, `deletedAt`);
