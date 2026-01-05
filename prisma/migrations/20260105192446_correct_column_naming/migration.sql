/*
  Warnings:

  - You are about to drop the column `academeicYear` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `academeicYear`,
    ADD COLUMN `academicYear` ENUM('L1', 'L2', 'L3', 'M1', 'M2', 'D1', 'D2', 'D3', 'D4', 'D5') NULL;
