/*
  Warnings:

  - You are about to drop the column `date` on the `appointment` table. All the data in the column will be lost.
  - You are about to alter the column `end` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `start` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `date`,
    MODIFY `end` DATETIME(3) NOT NULL,
    MODIFY `start` DATETIME(3) NOT NULL;
