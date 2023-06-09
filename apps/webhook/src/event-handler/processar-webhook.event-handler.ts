/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { IMonitorError } from '@app/contracts';

import {
  IProcessarWebhook,
  ProcessarWebhookData,
} from '@boleto/app/contracts/processar-webhook';
import { WebhookConsumer } from '@boleto/app/services/webhook.consumer';

import { SentryMonitorError } from '@infra/sentry';

@Controller()
export class ProcessarWebhookEventHandler {
  constructor(
    @Inject(WebhookConsumer)
    private readonly processarCsvConsumer: IProcessarWebhook,
    @Inject(SentryMonitorError)
    private readonly monitorErro: IMonitorError,
  ) {}
  @EventPattern('PROCESSAR_WEBHOOK')
  async handle(
    @Payload()
    { idCobranca, valorPago, nomePagador, dataPagamento }: ProcessarWebhookData,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.processarCsvConsumer.handle({
        idCobranca,
        valorPago,
        nomePagador,
        dataPagamento,
      });
    } catch (error) {
      this.monitorErro.capture(error);
    }
    channel.ack(originalMsg);
  }
}
