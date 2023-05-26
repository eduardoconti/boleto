import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideGerarBoletoUseCase,
} from './dependency-injection';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [provideGerarBoletoUseCase, provideBoletoRepository],
  exports: [provideGerarBoletoUseCase, provideBoletoRepository],
})
export class BoletoModule {}
