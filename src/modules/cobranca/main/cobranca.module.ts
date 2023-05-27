import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { BoletoModule } from '@boleto/main/boleto.module';

import { GerarCobrancaPublisher } from '@cobranca/infra/publisher';
import { GerarCobrancaController } from '@cobranca/presentation/controllers';
import { SalvarCsvCobrancaController } from '@cobranca/presentation/controllers/salvar-csv-cobranca.controller';
import { ProcessarCsvCobrancaEventHandler } from '@cobranca/presentation/event-handler';

import { InfraModule } from '@infra/infra.module';

import {
  provideCobrancaRepository,
  provideCsvCobrancaRepository,
  provideGerarCobrancaConsumer,
  provideGerarCobrancaUseCase,
  provideSalvarCsvCobrancaUseCase,
} from './dependency-injection';

@Module({
  imports: [
    InfraModule,
    forwardRef(() => BoletoModule),
    ClientsModule.register([
      {
        name: 'publisher_csv_boleto',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'csv_boleto',
          prefetchCount: 20,
          persistent: true,
          noAck: false,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
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
