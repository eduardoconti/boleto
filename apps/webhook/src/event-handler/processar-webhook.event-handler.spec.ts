import type { RmqContext } from '@nestjs/microservices';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { IMonitorError } from '@app/contracts';

import type { IProcessarWebhook } from '@boleto/app/contracts';
import { WebhookConsumer } from '@boleto/app/services/webhook.consumer';

import { SentryMonitorError } from '@infra/sentry';

import { ProcessarWebhookEventHandler } from './processar-webhook.event-handler';

const ctx = {
  getMessage: () => 'true',
  getChannelRef: () => {
    return { ack: (): boolean => true };
  },
} as unknown as RmqContext;
describe('ProcessarWebhookEventHandler', () => {
  let controller: ProcessarWebhookEventHandler;
  let processarCsvConsumer: IProcessarWebhook;
  let monitorError: IMonitorError;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcessarWebhookEventHandler],
      providers: [
        {
          provide: WebhookConsumer,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: SentryMonitorError,
          useValue: {
            capture: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get(ProcessarWebhookEventHandler);
    processarCsvConsumer = app.get<IProcessarWebhook>(WebhookConsumer);
    monitorError = app.get(SentryMonitorError);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(processarCsvConsumer).toBeDefined();
    expect(monitorError).toBeDefined();
  });

  it('should handle successfully', async () => {
    jest.spyOn(processarCsvConsumer, 'handle').mockResolvedValue();
    await controller.handle(
      {
        idCobranca: '1',
        dataPagamento: new Date(),
        nomePagador: 'eduardo',
        valorPago: 1000,
      },
      ctx,
    );
    expect(processarCsvConsumer.handle).toBeCalled();
  });

  it('should handle successfully when error ocurred in consumer', async () => {
    jest
      .spyOn(processarCsvConsumer, 'handle')
      .mockRejectedValue(new Error('error'));

    jest.spyOn(monitorError, 'capture').mockReturnValue();
    await controller.handle(
      {
        idCobranca: '1',
        dataPagamento: new Date(),
        nomePagador: 'eduardo',
        valorPago: 1000,
      },
      ctx,
    );
    expect(processarCsvConsumer.handle).toBeCalled();
    expect(monitorError.capture).toBeCalled();
  });
});
