-- CreateTable
CREATE TABLE "boleto_csv" (
    "id" TEXT NOT NULL,
    "caminho" TEXT NOT NULL,
    "processado" BOOLEAN NOT NULL,
    "data_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boleto_csv_pkey" PRIMARY KEY ("id")
);
