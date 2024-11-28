/*
  Warnings:

  - You are about to drop the `avaliacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comentarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favoritos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `receitas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `avaliacoes` DROP FOREIGN KEY `Avaliacoes_receita_id_fkey`;

-- DropForeignKey
ALTER TABLE `avaliacoes` DROP FOREIGN KEY `Avaliacoes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `Comentarios_receita_id_fkey`;

-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `Comentarios_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `favoritos` DROP FOREIGN KEY `Favoritos_receita_id_fkey`;

-- DropForeignKey
ALTER TABLE `favoritos` DROP FOREIGN KEY `Favoritos_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `receitas` DROP FOREIGN KEY `Receitas_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `receitas` DROP FOREIGN KEY `Receitas_categoriasId_categoria_fkey`;

-- DropTable
DROP TABLE `avaliacoes`;

-- DropTable
DROP TABLE `categorias`;

-- DropTable
DROP TABLE `comentarios`;

-- DropTable
DROP TABLE `favoritos`;

-- DropTable
DROP TABLE `receitas`;

-- CreateTable
CREATE TABLE `Recipes` (
    `id_recipes` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `ingredients` VARCHAR(191) NULL,
    `preparationMethod` VARCHAR(191) NULL,
    `observation` VARCHAR(191) NULL,
    `author_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `categorysId_category` INTEGER NULL,

    PRIMARY KEY (`id_recipes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorites` (
    `id_favorite` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_favorite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `id_comment` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_comment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ratings` (
    `id_rating` INTEGER NOT NULL AUTO_INCREMENT,
    `rating_value` DOUBLE NOT NULL,
    `user_id` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_rating`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recipes` ADD CONSTRAINT `Recipes_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipes` ADD CONSTRAINT `Recipes_categorysId_category_fkey` FOREIGN KEY (`categorysId_category`) REFERENCES `Categories`(`id_category`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`id_recipes`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`id_recipes`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`id_recipes`) ON DELETE RESTRICT ON UPDATE CASCADE;
