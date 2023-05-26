import { Module } from '@nestjs/common';

import {
  GerarBoletoCSVController,
  GerarBoletoController,
} from '@boleto/presentation/controllers';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideGerarBoletoItauService,
  provideGerarBoletoUseCase,
} from './dependency-injection';

@Module({
  imports: [InfraModule],
  controllers: [GerarBoletoController, GerarBoletoCSVController],
  providers: [
    provideGerarBoletoUseCase,
    provideBoletoRepository,
    provideGerarBoletoItauService,
  ],
  exports: [
    provideGerarBoletoUseCase,
    provideBoletoRepository,
    provideGerarBoletoItauService,
  ],
})
export class BoletoModule {}
