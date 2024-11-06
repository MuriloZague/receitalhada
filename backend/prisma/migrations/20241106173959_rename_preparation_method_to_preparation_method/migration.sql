/*
  Warnings:

  - You are about to drop the column `preparationMethod` on the `recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `recipes` DROP COLUMN `preparationMethod`,
    ADD COLUMN `preparation_method` VARCHAR(191) NULL;
