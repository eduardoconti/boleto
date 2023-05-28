/*
  Warnings:

  - You are about to drop the column `email` on the `boleto` table. All the data in the column will be lost.
  - You are about to drop the `boleto_csv` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `linha_digitavel` to the `boleto` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_cobranca` on the `boleto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "status_cobranca" AS ENUM ('EM_ABERTO', 'VENCIDA', 'PAGO', 'FALHA_GERAR_BOLETO');

-- CreateEnum
CREATE TYPE "psp" AS ENUM ('ITAU');

-- AlterEnum
ALTER TYPE "status_boleto" ADD VALUE 'EXPIRADO';

-- AlterTable
ALTER TABLE "boleto" DROP COLUMN "email",
ADD COLUMN     "linha_digitavel" TEXT NOT NULL,
DROP COLUMN "id_cobranca",
ADD COLUMN     "id_cobranca" INTEGER NOT NULL;

-- DropTable
DROP TABLE "boleto_csv";

-- CreateTable
CREATE TABLE "cobranca" (
    "id" SERIAL NOT NULL,
    "valor" INTEGER NOT NULL,
    "nome_devedor" TEXT NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "status" "status_cobranca" NOT NULL,
    "email" TEXT NOT NULL,
    "data_pagamento" TIMESTAMP(3),
    "nome_pagador" TEXT,
    "data_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cobranca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cobranca_arquivo" (
    "id" TEXT NOT NULL,
    "caminho" TEXT NOT NULL,
    "processado" BOOLEAN NOT NULL,
    "data_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cobranca_arquivo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boleto" ADD CONSTRAINT "boleto_id_cobranca_fkey" FOREIGN KEY ("id_cobranca") REFERENCES "cobranca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
