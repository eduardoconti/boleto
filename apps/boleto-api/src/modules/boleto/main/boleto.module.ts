import { Module, forwardRef } from '@nestjs/common';

import { WebhookPublisher } from '@boleto/infra/publisher';
import { WebhookBoletoController } from '@boleto/presentation/controllers';

import { CobrancaModule } from '@cobranca/main/cobranca.module';

import { InfraModule } from '@infra/infra.module';

import {
  provideBoletoRepository,
  provideGerarBoletoItauService,
  provideReceberWebhookUseCase,
  provideWebhookClientProxy,
  provideWebhookConsumer,
  provideWebhookRepository,
} from './dependency-injection';

@Module({
  imports: [InfraModule, forwardRef(() => CobrancaModule)],
  controllers: [WebhookBoletoController],
  providers: [
    provideBoletoRepository,
    provideGerarBoletoItauService,
    WebhookPublisher,
    provideWebhookRepository,
    provideWebhookConsumer,
    provideReceberWebhookUseCase,
    provideWebhookClientProxy,
  ],
  exports: [
    provideBoletoRepository,
    provideGerarBoletoItauService,
    provideWebhookRepository,
    provideWebhookConsumer,
    provideReceberWebhookUseCase,
  ],
})
export class BoletoModule {}
