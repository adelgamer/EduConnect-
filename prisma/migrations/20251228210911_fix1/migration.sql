/*
  Warnings:

  - You are about to drop the column `reactableId` on the `reaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reaction` DROP COLUMN `reactableId`,
    ADD COLUMN `reactionType` ENUM('LIKE', 'HELPFUL', 'EASY', 'TOUGH', 'FIRE', 'MIND_BLOWN') NOT NULL DEFAULT 'LIKE';
