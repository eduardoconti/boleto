import type { RmqContext } from '@nestjs/microservices';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { IProcessarCsvCobranca } from '@cobranca/app/contracts';
import { GerarCobrancaConsumer } from '@cobranca/app/services/gerar-cobranca.consumer';

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
      ],
    }).compile();

    controller = app.get(ProcessarCsvCobrancaEventHandler);
    processarCsvConsumer = app.get<IProcessarCsvCobranca>(
      GerarCobrancaConsumer,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(processarCsvConsumer).toBeDefined();
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
    await controller.handle({ idCsvCobranca: '' }, ctx);
    expect(processarCsvConsumer.handle).toBeCalled();
  });
});
