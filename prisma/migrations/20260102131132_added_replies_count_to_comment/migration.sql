/*
  Warnings:

  - You are about to drop the column `commentCount` on the `comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `commentCount`,
    ADD COLUMN `repliesCount` INTEGER NOT NULL DEFAULT 0;
