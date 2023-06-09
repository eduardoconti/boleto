import { Module, forwardRef } from '@nestjs/common';

import { BoletoInfraModule } from '@boleto/main/boleto-infra.module';

import { GerarCobrancaPublisher } from '@cobranca/infra/publisher';

import { InfraModule } from '@infra/infra.module';

import { CobrancaAppModule } from './cobranca-app.module';
import {
  provideCobrancaRepository,
  provideCsvCobrancaClientProxy,
  provideCsvCobrancaRepository,
} from './dependency-injection';

@Module({
  imports: [
    InfraModule,
    forwardRef(() => BoletoInfraModule),
    forwardRef(() => CobrancaAppModule),
  ],
  providers: [
    provideCobrancaRepository,
    provideCsvCobrancaRepository,
    GerarCobrancaPublisher,
    provideCsvCobrancaClientProxy,
  ],
  exports: [
    provideCobrancaRepository,
    provideCsvCobrancaRepository,
    GerarCobrancaPublisher,
    InfraModule,
  ],
})
export class CobrancaInfraModule {}
