import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { WebhookPublisher } from '@boleto/infra/publisher';
import { GerarBoletoCsvPublisher } from '@boleto/infra/publisher/gerar-boleto-csv.publisher';
import {
  SalvarCsvCobrancaController,
  GerarBoletoController,
  WebhookBoletoController,
} from '@boleto/presentation/controllers';
import { ProcessarCsvBoletoEventHandler } from '@boleto/presentation/event-handler';
import { ProcessarWebhookEventHandler } from '@boleto/presentation/event-handler/processar-webhook.event-handler';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideCsvCobrancaRepository,
  provideGerarBoletoCsvConsumer,
  provideGerarBoletoItauService,
  provideGerarBoletoUseCase,
  provideReceberWebookUseCase,
  provideSalvarCsvCobrancaUseCase,
  provideWebhookConsumer,
  provideWebhookRepository,
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
    ClientsModule.register([
      {
        name: 'publisher_webhook',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'webhook',
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
    ProcessarWebhookEventHandler,
    WebhookBoletoController,
  ],
  providers: [
    provideGerarBoletoUseCase,
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideSalvarCsvCobrancaUseCase,
    provideCsvCobrancaRepository,
    provideGerarBoletoCsvConsumer,
    GerarBoletoCsvPublisher,
    WebhookPublisher,
    provideWebhookRepository,
    provideWebhookConsumer,
    provideReceberWebookUseCase,
  ],
  exports: [
    provideGerarBoletoUseCase,
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideSalvarCsvCobrancaUseCase,
    provideCsvCobrancaRepository,
    provideGerarBoletoCsvConsumer,
    provideWebhookRepository,
    provideWebhookConsumer,
    provideReceberWebookUseCase,
  ],
})
export class BoletoModule {}
