import { Module } from '@nestjs/common';

import { BoletoModule } from '@boleto/main/boleto.module';

import { InfraModule } from '@infra/infra.module';

import { ProcessarWebhookEventHandler } from './event-handler';

@Module({
  imports: [InfraModule, BoletoModule],
  controllers: [ProcessarWebhookEventHandler],
})
export class ConsumerWebhook {}
