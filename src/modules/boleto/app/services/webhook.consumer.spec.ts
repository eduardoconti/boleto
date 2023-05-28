import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { provideWebhookConsumer } from '@boleto/main/dependency-injection';

import {
  mockCobrancaEntityPago,
  mockCobrancaEntityPendente,
} from '@cobranca/__mocks__/entity';
import type { ICobrancaRepository } from '@cobranca/domain/contracts';
import { CobrancaRepository } from '@cobranca/infra/repositories';

import type { IProcessarWebhook } from '../contracts';
import { WebhookConsumer } from './webhook.consumer';

describe('WebhookConsumer', () => {
  let webhookConsumer: IProcessarWebhook;
  let cobrancaRepository: ICobrancaRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideWebhookConsumer,
        {
          provide: CobrancaRepository,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    webhookConsumer = app.get<IProcessarWebhook>(WebhookConsumer);
    cobrancaRepository = app.get<ICobrancaRepository>(CobrancaRepository);
  });

  it('should be defined', () => {
    expect(webhookConsumer).toBeDefined();
    expect(cobrancaRepository).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest
      .spyOn(cobrancaRepository, 'findOne')
      .mockResolvedValue(mockCobrancaEntityPendente);
    jest
      .spyOn(cobrancaRepository, 'update')
      .mockResolvedValue(mockCobrancaEntityPago);

    await webhookConsumer.handle({
      idCobranca: '1',
      dataPagamento: new Date(),
      nomePagador: 'eduardo',
      valorPago: 1000,
    });

    expect(cobrancaRepository.findOne).toBeCalled();
    expect(cobrancaRepository.update).toBeCalled();
  });
});
