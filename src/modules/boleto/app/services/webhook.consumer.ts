import type { IBoletoRepository } from '@boleto/domain/contracts';

import type { IProcessarWebhook, ProcessarWebhookData } from '../contracts';

export class WebhookConsumer implements IProcessarWebhook {
  constructor(private readonly boletoRepository: IBoletoRepository) {}
  async handle({
    idCobranca,
    valorPago,
    nomePagador,
  }: ProcessarWebhookData): Promise<void> {
    const boleto = await this.boletoRepository.findOne({
      idCobranca,
    });

    boleto.realizarPagamento({
      valorPago: valorPago,
      nomePagador: nomePagador,
    });

    await this.boletoRepository.update(boleto);
  }
}
