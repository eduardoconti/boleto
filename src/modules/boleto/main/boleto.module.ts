import { Module, forwardRef } from '@nestjs/common';

import { WebhookPublisher } from '@boleto/infra/publisher';
import { WebhookBoletoController } from '@boleto/presentation/controllers';
import { ProcessarWebhookEventHandler } from '@boleto/presentation/event-handler/processar-webhook.event-handler';

import { CobrancaModule } from '@cobranca/main/cobranca.module';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideGerarBoletoItauService,
  provideReceberWebookUseCase,
  provideWebhookClientProxy,
  provideWebhookConsumer,
  provideWebhookRepository,
} from './dependency-injection';

@Module({
  imports: [InfraModule, forwardRef(() => CobrancaModule)],
  controllers: [ProcessarWebhookEventHandler, WebhookBoletoController],
  providers: [
    provideBoletoRepository,
    provideGerarBoletoItauService,
    WebhookPublisher,
    provideWebhookRepository,
    provideWebhookConsumer,
    provideReceberWebookUseCase,
    provideWebhookClientProxy,
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
