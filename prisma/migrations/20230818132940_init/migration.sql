/*
  Warnings:

  - You are about to drop the column `day` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `end` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `day`,
    DROP COLUMN `time`,
    ADD COLUMN `end` VARCHAR(191) NOT NULL,
    ADD COLUMN `start` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
