/*
  Warnings:

  - A unique constraint covering the columns `[forgot_password_code]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `forgot_password_attempted_at` DATETIME(3) NULL,
    ADD COLUMN `forgot_password_attempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `forgot_password_code` VARCHAR(191) NULL,
    ADD COLUMN `forgot_password_expires_at` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_forgot_password_code_key` ON `Users`(`forgot_password_code`);
