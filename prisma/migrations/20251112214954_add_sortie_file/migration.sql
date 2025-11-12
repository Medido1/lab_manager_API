-- AlterTable
ALTER TABLE "ClientData" ADD COLUMN     "file" BYTEA,
ADD COLUMN     "sortie" BOOLEAN NOT NULL DEFAULT false;
