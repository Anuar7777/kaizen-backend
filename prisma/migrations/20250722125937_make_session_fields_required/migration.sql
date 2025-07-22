/*
  Warnings:

  - Made the column `work_interval` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `break_interval` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `interval_count` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "work_interval" SET NOT NULL,
ALTER COLUMN "break_interval" SET NOT NULL,
ALTER COLUMN "interval_count" SET NOT NULL;
