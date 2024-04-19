-- CreateTable
CREATE TABLE "health_units" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "health_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nurse_shifts" (
    "id" TEXT NOT NULL,
    "approved" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "nurse_id" TEXT NOT NULL,
    "shift_id" TEXT NOT NULL,

    CONSTRAINT "nurse_shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nurses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "nurses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shifts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "health_unit_id" TEXT,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nurses_email_key" ON "nurses"("email");

-- AddForeignKey
ALTER TABLE "nurse_shifts" ADD CONSTRAINT "nurse_shifts_nurse_id_fkey" FOREIGN KEY ("nurse_id") REFERENCES "nurses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nurse_shifts" ADD CONSTRAINT "nurse_shifts_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_health_unit_id_fkey" FOREIGN KEY ("health_unit_id") REFERENCES "health_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
