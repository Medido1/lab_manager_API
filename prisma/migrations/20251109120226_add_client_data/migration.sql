-- CreateTable
CREATE TABLE "ClientData" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,
    "remaining" DECIMAL(8,2) NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientData_pkey" PRIMARY KEY ("id")
);
