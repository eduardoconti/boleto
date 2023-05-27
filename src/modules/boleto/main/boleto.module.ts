import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { WebhookPublisher } from '@boleto/infra/publisher';
import { WebhookBoletoController } from '@boleto/presentation/controllers';
import { ProcessarWebhookEventHandler } from '@boleto/presentation/event-handler/processar-webhook.event-handler';

import { CobrancaModule } from '@cobranca/main/cobranca.module';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideGerarBoletoItauService,
  provideReceberWebookUseCase,
  provideWebhookConsumer,
  provideWebhookRepository,
} from './dependency-injection';

@Module({
  imports: [
    InfraModule,
    forwardRef(() => CobrancaModule),
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
  controllers: [ProcessarWebhookEventHandler, WebhookBoletoController],
  providers: [
    provideBoletoRepository,
    provideGerarBoletoItauService,
    WebhookPublisher,
    provideWebhookRepository,
    provideWebhookConsumer,
    provideReceberWebookUseCase,
  ],
  exports: [
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideWebhookRepository,
    provideWebhookConsumer,
    provideReceberWebookUseCase,
  ],
})
export class BoletoModule {}
