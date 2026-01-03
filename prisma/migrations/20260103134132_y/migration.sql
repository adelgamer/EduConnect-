/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `faculty` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `specialty` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,universityId,deletedAt]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,facultyId,deletedAt]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Faculty_name_universityId_key` ON `faculty`;

-- DropIndex
DROP INDEX `Specialty_name_facultyId_key` ON `specialty`;

-- AlterTable
ALTER TABLE `faculty` DROP COLUMN `isDeleted`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `specialty` DROP COLUMN `isDeleted`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Faculty_name_universityId_deletedAt_key` ON `Faculty`(`name`, `universityId`, `deletedAt`);

-- CreateIndex
CREATE UNIQUE INDEX `Specialty_name_facultyId_deletedAt_key` ON `Specialty`(`name`, `facultyId`, `deletedAt`);
