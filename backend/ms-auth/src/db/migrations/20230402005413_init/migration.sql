-- CreateEnum
CREATE TYPE "Role" AS ENUM ('super_admin', 'Employeur', 'Demandeur', 'admin');

-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('Femme', 'Homme');

-- CreateTable
CREATE TABLE "Compte" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" BIGINT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Compte_email_key" ON "Compte"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Compte_resetPasswordToken_key" ON "Compte"("resetPasswordToken");
