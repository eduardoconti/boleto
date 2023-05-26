-- CreateEnum
CREATE TYPE "status_boleto" AS ENUM ('PENDENTE', 'PAGO');

-- CreateTable
CREATE TABLE "boleto" (
    "id" TEXT NOT NULL,
    "id_cobranca" TEXT NOT NULL,
    "id_psp" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "nome_devedor" TEXT NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "data_pagamento" TIMESTAMP(3),
    "nome_pagador" TEXT,
    "status" "status_boleto" NOT NULL,
    "email" TEXT NOT NULL,
    "data_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boleto_pkey" PRIMARY KEY ("id")
);
