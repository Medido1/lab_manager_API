-- CreateTable
CREATE TABLE "ClientData" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "sortie" BOOLEAN NOT NULL DEFAULT false,
    "fullName" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "remaining" DECIMAL(65,30) NOT NULL,
    "phoneNumber" TEXT,
    "endDate" TIMESTAMP(3) NOT NULL,
    "file" BYTEA,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientData_pkey" PRIMARY KEY ("id")
);
