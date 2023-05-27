-- CreateTable
CREATE TABLE "webhook" (
    "id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "valor_pago" INTEGER NOT NULL,
    "id_cobranca" TEXT NOT NULL,
    "data_pagamento" TIMESTAMP(3) NOT NULL,
    "data_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webhook_pkey" PRIMARY KEY ("id")
);
