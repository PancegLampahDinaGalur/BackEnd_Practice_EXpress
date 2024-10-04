-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "manufactur" VARCHAR,
    "type" VARCHAR,
    "license_number" VARCHAR,
    "seat" INTEGER,
    "baggage" INTEGER,
    "name_car" VARCHAR,
    "transmition" VARCHAR,
    "description" TEXT,
    "year" DATE,
    "is_driver" BOOLEAN DEFAULT true,
    "is_available" BOOLEAN,
    "img" TEXT,
    "create_by" VARCHAR,
    "update_by" VARCHAR,
    "create_dt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_dt" TIMESTAMP(3),
    "price" INTEGER,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "order_no" VARCHAR NOT NULL,
    "users_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(6),
    "end_time" TIMESTAMP(6),
    "total" DOUBLE PRECISION,
    "is_driver" BOOLEAN,
    "is_expired" BOOLEAN,
    "status" VARCHAR,
    "is_deleted" BOOLEAN,
    "create_by" VARCHAR,
    "update_by" VARCHAR,
    "create_dt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_dt" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "addres" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL,
    "gender" VARCHAR,
    "avatar" VARCHAR,
    "phone_number" VARCHAR NOT NULL,
    "driver_license" TEXT NOT NULL,
    "birthdate" DATE,
    "create_by" VARCHAR,
    "update_by" VARCHAR,
    "create_dt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_dt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "car_name_index" ON "cars"("name_car");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_no_key" ON "orders"("order_no");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
