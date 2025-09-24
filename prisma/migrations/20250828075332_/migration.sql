/*
  Warnings:

  - Changed the type of `additionalData` on the `EventAttendees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."EventAttendees" DROP COLUMN "additionalData",
ADD COLUMN     "additionalData" JSONB NOT NULL;
