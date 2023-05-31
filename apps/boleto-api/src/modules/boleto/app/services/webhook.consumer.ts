import type { ICobrancaRepository } from '@cobranca/domain/contracts';

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
      boleto: { pspId: idCobranca },
    });

    cobranca.marcarComoPago({ valorPago, nomePagador, dataPagamento });
    await this.cobrancaRepository.update(cobranca);
  }
}
