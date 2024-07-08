/*
  Warnings:

  - Made the column `email` on table `commandes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "commandes" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);
