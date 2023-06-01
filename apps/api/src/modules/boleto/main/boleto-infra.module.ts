import { Module, forwardRef } from '@nestjs/common';

import { WebhookPublisher } from '@boleto/infra/publisher';

import { CobrancaInfraModule } from '@cobranca/main/cobranca-infra.module';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideGerarBoletoItauService,
  provideWebhookClientProxy,
  provideWebhookConsumer,
  provideWebhookRepository,
} from './dependency-injection';

@Module({
  imports: [InfraModule, forwardRef(() => CobrancaInfraModule)],
  providers: [
    provideBoletoRepository,
    provideGerarBoletoItauService,
    WebhookPublisher,
    provideWebhookRepository,
    provideWebhookConsumer,
    provideWebhookClientProxy,
  ],
  exports: [
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideWebhookRepository,
    provideWebhookConsumer,
    WebhookPublisher,
    InfraModule,
  ],
})
export class BoletoInfraModule {}
