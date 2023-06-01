import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockWebhookEntity } from '@boleto/__mocks__/entity';
import type { IWebhookRepository } from '@boleto/domain/contracts';
import type { IReceberWebhookUseCase } from '@boleto/domain/use-cases';
import { WebhookPublisher } from '@boleto/infra/publisher';
import { WebhookRepository } from '@boleto/infra/repositories/webhook.repository';
import { provideReceberWebhookUseCase } from '@boleto/main/dependency-injection';

import type { IPublisherWebhook } from '../contracts';
import { ReceberWebhookUseCase } from './receber-webhook.use-case';

describe('ReceberWebhookUseCase', () => {
  let receberWebhookUseCase: IReceberWebhookUseCase;
  let webhookRepository: IWebhookRepository;
  let publisherService: IPublisherWebhook;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideReceberWebhookUseCase,
        {
          provide: WebhookRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: WebhookPublisher,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    receberWebhookUseCase = app.get<IReceberWebhookUseCase>(
      ReceberWebhookUseCase,
    );
    webhookRepository = app.get<IWebhookRepository>(WebhookRepository);
    publisherService = app.get<IPublisherWebhook>(WebhookPublisher);
  });

  it('should be defined', () => {
    expect(receberWebhookUseCase).toBeDefined();
    expect(webhookRepository).toBeDefined();
    expect(publisherService).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest.spyOn(webhookRepository, 'save').mockResolvedValue(mockWebhookEntity);

    jest.spyOn(publisherService, 'publish').mockResolvedValue();
    await receberWebhookUseCase.execute({
      dataPagamento: new Date(),
      idCobranca: '1',
      nomePagador: 'eduardo',
      payload: '',
      valorPago: 1000,
    });
    expect(publisherService.publish).toBeCalled();
    expect(webhookRepository.save).toBeCalled();
  });
});
