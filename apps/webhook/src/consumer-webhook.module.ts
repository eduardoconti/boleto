import { Module } from '@nestjs/common';

import { BoletoInfraModule } from '@boleto/main/boleto-infra.module';

import { ProcessarWebhookEventHandler } from './event-handler';

@Module({
  imports: [BoletoInfraModule],
  controllers: [ProcessarWebhookEventHandler],
})
export class ConsumerWebhook {}
