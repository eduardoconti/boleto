import type { IConsumer } from '@app/contracts';

export interface ProcessarWebhookData {
  idCobranca: string;
  valorPago: number;
  nomePagador: string;
}
export type IProcessarWebhook = IConsumer<ProcessarWebhookData>;
