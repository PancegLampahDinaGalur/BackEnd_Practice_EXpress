-- AlterTable
ALTER TABLE "access" ADD COLUMN     "create_by" VARCHAR,
ADD COLUMN     "create_dt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_by" VARCHAR,
ADD COLUMN     "update_dt" TIMESTAMP(3);
