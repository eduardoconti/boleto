import type { WebhookItauInput } from '@boleto/presentation/dto/webhook-itau-input.dto';

export const mockWebhookBoletoItauInput: WebhookItauInput = {
  debtId: '1',
  paidAmount: 100.0,
  paidAt: new Date(),
  paidBy: 'Eduardo Conti',
};
