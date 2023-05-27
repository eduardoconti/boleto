import type { ICobrancaRepository } from '@cobranca/domain/contracts';

import { SerialID } from '@domain-core/value-objects/id-serial.value-object';

import type { IProcessarWebhook, ProcessarWebhookData } from '../contracts';

export class WebhookConsumer implements IProcessarWebhook {
  constructor(private readonly cobrancaRepository: ICobrancaRepository) {}
  async handle({
    idCobranca,
    valorPago,
    nomePagador,
    dataPagamento,
  }: ProcessarWebhookData): Promise<void> {
    const cobranca = await this.cobrancaRepository.findOne({
      id: new SerialID(parseInt(idCobranca)),
    });

    cobranca.marcarComoPago({ valorPago, nomePagador, dataPagamento });
    await this.cobrancaRepository.update(cobranca);
  }
}
