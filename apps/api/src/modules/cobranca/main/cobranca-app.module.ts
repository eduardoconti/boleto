import { Module, forwardRef } from '@nestjs/common';

import { BoletoInfraModule } from '@boleto/main/boleto-infra.module';

import { CobrancaInfraModule } from './cobranca-infra.module';
import {
  provideGerarCobrancaUseCase,
  provideSalvarCsvCobrancaUseCase,
} from './dependency-injection';

@Module({
  imports: [
    forwardRef(() => CobrancaInfraModule),
    forwardRef(() => BoletoInfraModule),
  ],
  providers: [provideGerarCobrancaUseCase, provideSalvarCsvCobrancaUseCase],
  exports: [provideGerarCobrancaUseCase, provideSalvarCsvCobrancaUseCase],
})
export class CobrancaAppModule {}
