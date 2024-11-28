/*
  Warnings:

  - You are about to drop the column `author_id` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `categorysId_category` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `recipes` DROP FOREIGN KEY `Recipes_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `recipes` DROP FOREIGN KEY `Recipes_categorysId_category_fkey`;

-- AlterTable
ALTER TABLE `recipes` DROP COLUMN `author_id`,
    DROP COLUMN `categorysId_category`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Recipes` ADD CONSTRAINT `Recipes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipes` ADD CONSTRAINT `Recipes_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;
