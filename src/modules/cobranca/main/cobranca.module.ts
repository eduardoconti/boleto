import { Module, forwardRef } from '@nestjs/common';

import { BoletoModule } from '@boleto/main/boleto.module';

import { GerarCobrancaPublisher } from '@cobranca/infra/publisher';
import { GerarCobrancaController } from '@cobranca/presentation/controllers';
import { SalvarCsvCobrancaController } from '@cobranca/presentation/controllers/salvar-csv-cobranca.controller';
import { ProcessarCsvCobrancaEventHandler } from '@cobranca/presentation/event-handler';

import { InfraModule } from '@infra/infra.module';

import {
  provideCobrancaRepository,
  provideCsvCobrancaClientProxy,
  provideCsvCobrancaRepository,
  provideGerarCobrancaConsumer,
  provideGerarCobrancaUseCase,
  provideSalvarCsvCobrancaUseCase,
} from './dependency-injection';

@Module({
  imports: [InfraModule, forwardRef(() => BoletoModule)],
  controllers: [
    GerarCobrancaController,
    SalvarCsvCobrancaController,
    ProcessarCsvCobrancaEventHandler,
  ],
  providers: [
    provideGerarCobrancaUseCase,
    provideCobrancaRepository,
    provideSalvarCsvCobrancaUseCase,
    provideCsvCobrancaRepository,
    GerarCobrancaPublisher,
    provideGerarCobrancaConsumer,
    provideCsvCobrancaClientProxy,
  ],
  exports: [
    provideGerarCobrancaUseCase,
    provideCobrancaRepository,
    provideSalvarCsvCobrancaUseCase,
    provideCsvCobrancaRepository,
    provideGerarCobrancaConsumer,
  ],
})
export class CobrancaModule {}
