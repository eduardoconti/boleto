import type { IUseCase } from '@domain-core/contracts';

export interface IReceberWebhookUseCaseInput {
  payload: string;
  valorPago: number;
  idCobranca: string;
  dataPagamento: Date;
  nomePagador: string;
}

export type IReceberWebhookUseCase = IUseCase<
  IReceberWebhookUseCaseInput,
  void
>;
