/*
  Warnings:

  - You are about to drop the column `aiConfidence` on the `report` table. All the data in the column will be lost.
  - Added the required column `confidenceKategori` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confidenceUrgensi` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` DROP COLUMN `aiConfidence`,
    ADD COLUMN `confidenceKategori` DOUBLE NOT NULL,
    ADD COLUMN `confidenceUrgensi` DOUBLE NOT NULL;
