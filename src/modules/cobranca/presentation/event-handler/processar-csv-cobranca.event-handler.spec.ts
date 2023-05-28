import type { RmqContext } from '@nestjs/microservices';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { IMonitorError } from '@app/contracts';

import type { IProcessarCsvCobranca } from '@cobranca/app/contracts';
import { GerarCobrancaConsumer } from '@cobranca/app/services/gerar-cobranca.consumer';

import { SentryMonitorError } from '@infra/sentry';

import { ProcessarCsvCobrancaEventHandler } from './processar-csv-cobranca.event-handler';

const ctx = {
  getMessage: () => 'true',
  getChannelRef: () => {
    return { ack: () => true };
  },
} as unknown as RmqContext;
describe('ProcessarCsvCobrancaEventHandler', () => {
  let controller: ProcessarCsvCobrancaEventHandler;
  let processarCsvConsumer: IProcessarCsvCobranca;
  let monitorError: IMonitorError;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcessarCsvCobrancaEventHandler],
      providers: [
        {
          provide: GerarCobrancaConsumer,
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

    controller = app.get(ProcessarCsvCobrancaEventHandler);
    processarCsvConsumer = app.get<IProcessarCsvCobranca>(
      GerarCobrancaConsumer,
    );
    monitorError = app.get(SentryMonitorError);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(processarCsvConsumer).toBeDefined();
    expect(monitorError).toBeDefined();
  });

  it('should handle successfully', async () => {
    jest.spyOn(processarCsvConsumer, 'handle').mockResolvedValue();
    await controller.handle({ idCsvCobranca: '' }, ctx);
    expect(processarCsvConsumer.handle).toBeCalled();
  });

  it('should handle successfully when error ocurred in consumer', async () => {
    jest
      .spyOn(processarCsvConsumer, 'handle')
      .mockRejectedValue(new Error('error'));

    jest.spyOn(monitorError, 'capture').mockReturnValue();
    await controller.handle({ idCsvCobranca: '' }, ctx);
    expect(processarCsvConsumer.handle).toBeCalled();
    expect(monitorError.capture).toBeCalled();
  });
});
