-- AlterTable
ALTER TABLE `appointment` MODIFY `status` ENUM('CONFIRMED', 'PAID', 'CANCELLED', 'PENDING') NOT NULL DEFAULT 'PENDING';
