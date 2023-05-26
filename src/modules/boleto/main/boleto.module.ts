import { Module } from '@nestjs/common';

import {
  SalvarCsvCobrancaController,
  GerarBoletoController,
} from '@boleto/presentation/controllers';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideCsvCobrancaRepository,
  provideGerarBoletoItauService,
  provideGerarBoletoUseCase,
  provideSalvarCsvCobrancaUseCase,
} from './dependency-injection';

@Module({
  imports: [InfraModule],
  controllers: [GerarBoletoController, SalvarCsvCobrancaController],
  providers: [
    provideGerarBoletoUseCase,
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideSalvarCsvCobrancaUseCase,
    provideCsvCobrancaRepository,
  ],
  exports: [
    provideGerarBoletoUseCase,
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideSalvarCsvCobrancaUseCase,
    provideCsvCobrancaRepository,
  ],
})
export class BoletoModule {}
