import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockWebhookBoletoItauInput } from '@boleto/__mocks__/usecase';
import { ReceberWebhookUseCase } from '@boleto/app/use-cases/receber-webhook.use-case';
import type { IReceberWebhookUseCase } from '@boleto/domain/use-cases';

import { WebhookBoletoController } from './webhook-boleto.controller';

describe('WebhookBoletoController', () => {
  let controller: WebhookBoletoController;
  let receberWebhookUseCase: IReceberWebhookUseCase;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WebhookBoletoController],
      providers: [
        {
          provide: ReceberWebhookUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get(WebhookBoletoController);
    receberWebhookUseCase = app.get<IReceberWebhookUseCase>(
      ReceberWebhookUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(receberWebhookUseCase).toBeDefined();
  });

  it('should execute controller with all fields', async () => {
    jest.spyOn(receberWebhookUseCase, 'execute').mockResolvedValue();
    await controller.handle(mockWebhookBoletoItauInput);

    expect(receberWebhookUseCase.execute).toBeCalled();
  });
});
