-- AlterTable
ALTER TABLE "users" ALTER COLUMN "driver_license" DROP NOT NULL,
ALTER COLUMN "birthdate" SET DATA TYPE TEXT;
