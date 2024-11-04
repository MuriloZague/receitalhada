/*
  Warnings:

  - A unique constraint covering the columns `[authenticate_code]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `authenticate_code` VARCHAR(191) NULL,
    ADD COLUMN `register_at` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_authenticate_code_key` ON `Users`(`authenticate_code`);
