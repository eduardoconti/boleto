/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { IMonitorError } from '@app/contracts';

import {
  IProcessarCsvCobranca,
  ProcessarCsvCobrancaData,
} from '@cobranca/app/contracts';
import { GerarCobrancaConsumer } from '@cobranca/app/services/gerar-cobranca.consumer';

import { SentryMonitorError } from '@infra/sentry';

@Controller()
export class ProcessarCsvCobrancaEventHandler {
  constructor(
    @Inject(GerarCobrancaConsumer)
    private readonly processarCsvConsumer: IProcessarCsvCobranca,
    @Inject(SentryMonitorError)
    private readonly monitorErro: IMonitorError,
  ) {}
  @EventPattern('PROCESSAR_CSV')
  async handle(
    @Payload() { idCsvCobranca }: ProcessarCsvCobrancaData,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.processarCsvConsumer.handle({
        idCsvCobranca,
      });
    } catch (error) {
      this.monitorErro.capture(error);
    }
    channel.ack(originalMsg);
  }
}
