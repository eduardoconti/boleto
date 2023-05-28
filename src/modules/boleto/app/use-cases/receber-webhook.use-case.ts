import type { IWebhookRepository } from '@boleto/domain/contracts';
import { WebhookEntity } from '@boleto/domain/entities';
import type {
  IReceberWebhookUseCase,
  IReceberWebhookUseCaseInput,
} from '@boleto/domain/use-cases';

import type { IPublisherWebhook } from '../contracts/publisher-webhook';

export class ReceberWebhookUseCase implements IReceberWebhookUseCase {
  constructor(
    private readonly repository: IWebhookRepository,
    private readonly publisher: IPublisherWebhook,
  ) {}
  async execute(request: IReceberWebhookUseCaseInput): Promise<void> {
    const webhook = WebhookEntity.create({ ...request });
    await this.repository.save(webhook);
    await this.publisher.publish({
      idCobranca: webhook.idCobranca,
      valorPago: webhook.valorPago.value,
      nomePagador: request.nomePagador,
      dataPagamento: request.dataPagamento,
    });
  }
}
