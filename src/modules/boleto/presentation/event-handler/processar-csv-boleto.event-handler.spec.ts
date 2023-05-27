import type { RmqContext } from '@nestjs/microservices';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { IProcessarCsv } from '@boleto/app/contracts';
import { GerarBoletoCsvConsumer } from '@boleto/app/services/gerar-boleto-csv.consumer';

import { ProcessarCsvBoletoEventHandler } from './processar-csv-boleto.event-handler';

const ctx = {
  getMessage: () => 'true',
  getChannelRef: () => {
    return { ack: () => true };
  },
} as unknown as RmqContext;
describe('ProcessarCsvBoletoEventHandler', () => {
  let controller: ProcessarCsvBoletoEventHandler;
  let processarCsvConsumer: IProcessarCsv;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcessarCsvBoletoEventHandler],
      providers: [
        {
          provide: GerarBoletoCsvConsumer,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get(ProcessarCsvBoletoEventHandler);
    processarCsvConsumer = app.get<IProcessarCsv>(GerarBoletoCsvConsumer);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(processarCsvConsumer).toBeDefined();
  });

  it('should handle successfully', async () => {
    jest.spyOn(processarCsvConsumer, 'handle').mockResolvedValue();
    await controller.handle({ idCsvCobranca: '', caminho: '' }, ctx);
    expect(processarCsvConsumer.handle).toBeCalled();
  });

  it('should handle successfully when error ocurred in consumer', async () => {
    jest
      .spyOn(processarCsvConsumer, 'handle')
      .mockRejectedValue(new Error('error'));
    await controller.handle({ idCsvCobranca: '', caminho: '' }, ctx);
    expect(processarCsvConsumer.handle).toBeCalled();
  });
});
