import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GerarBoletoCsvPublisher } from '@boleto/infra/publisher/gerar-boleto-csv.publisher';
import {
  SalvarCsvCobrancaController,
  GerarBoletoController,
} from '@boleto/presentation/controllers';
import { ProcessarCsvBoletoEventHandler } from '@boleto/presentation/event-handler';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideCsvCobrancaRepository,
  provideGerarBoletoCsvConsumer,
  provideGerarBoletoItauService,
  provideGerarBoletoUseCase,
  provideSalvarCsvCobrancaUseCase,
} from './dependency-injection';

@Module({
  imports: [
    InfraModule,
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
    GerarBoletoController,
    SalvarCsvCobrancaController,
    ProcessarCsvBoletoEventHandler,
  ],
  providers: [
    provideGerarBoletoUseCase,
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideSalvarCsvCobrancaUseCase,
    provideCsvCobrancaRepository,
    provideGerarBoletoCsvConsumer,
    GerarBoletoCsvPublisher,
  ],
  exports: [
    provideGerarBoletoUseCase,
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideSalvarCsvCobrancaUseCase,
    provideCsvCobrancaRepository,
    provideGerarBoletoCsvConsumer,
  ],
})
export class BoletoModule {}
