/*
  Warnings:

  - A unique constraint covering the columns `[name,universityId]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,facultyId]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `University` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortName]` on the table `University` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Faculty_name_universityId_key` ON `Faculty`(`name`, `universityId`);

-- CreateIndex
CREATE UNIQUE INDEX `Specialty_name_facultyId_key` ON `Specialty`(`name`, `facultyId`);

-- CreateIndex
CREATE UNIQUE INDEX `University_name_key` ON `University`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `University_shortName_key` ON `University`(`shortName`);
