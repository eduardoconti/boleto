/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { IProcessarCsv, ProcessarCsvData } from '@boleto/app/contracts';
import { GerarBoletoCsvConsumer } from '@boleto/app/services/gerar-boleto-csv.consumer';

@Controller()
export class ProcessarCsvBoletoEventHandler {
  constructor(
    @Inject(GerarBoletoCsvConsumer)
    private readonly processarCsvConsumer: IProcessarCsv,
  ) {}
  @EventPattern('PROCESSAR_CSV')
  async handle(
    @Payload() { caminho, idCsvCobranca }: ProcessarCsvData,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.processarCsvConsumer.handle({
        caminho,
        idCsvCobranca,
      });
    } catch (error) {
      console.log(error);
    }
    channel.ack(originalMsg);
  }
}
