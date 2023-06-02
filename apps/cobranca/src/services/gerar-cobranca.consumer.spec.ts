import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockGerarCobrancaUseCaseOutput } from '@cobranca/__mocks__/dto';
import {
  mockArquivoCobrancaEntity,
  mockArquivoCobrancaEntityProcessado,
} from '@cobranca/__mocks__/entity';
import { GerarCobrancaUseCase } from '@cobranca/app/use-cases';
import type { ICsvCobrancaRepository } from '@cobranca/domain/contracts';
import type { IGerarCobrancaUseCase } from '@cobranca/domain/use-cases';
import { CsvCobrancaRepository } from '@cobranca/infra/repositories';

import { ReadFileCsv } from '@infra/csv/csv-reader';

import type { ICsvCobrancaReader, IProcessarCsvCobranca } from '../contracts';
import { provideGerarCobrancaConsumer } from '../main/dependency-injection';
import { GerarCobrancaConsumer } from './gerar-cobranca.consumer';

describe('GerarCobrancaConsumer', () => {
  let gerarCobrancaConsumer: IProcessarCsvCobranca;
  let gerarCobrancaUseCase: IGerarCobrancaUseCase;
  let csvCobrancaRepository: ICsvCobrancaRepository;
  let csvReader: ICsvCobrancaReader;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideGerarCobrancaConsumer,
        {
          provide: GerarCobrancaUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CsvCobrancaRepository,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: ReadFileCsv,
          useValue: {
            read: jest.fn(),
          },
        },
      ],
    }).compile();

    gerarCobrancaConsumer = app.get<IProcessarCsvCobranca>(
      GerarCobrancaConsumer,
    );
    gerarCobrancaUseCase = app.get<IGerarCobrancaUseCase>(GerarCobrancaUseCase);
    csvCobrancaRepository = app.get<ICsvCobrancaRepository>(
      CsvCobrancaRepository,
    );
    csvReader = app.get<ICsvCobrancaReader>(ReadFileCsv);
  });

  it('should be defined', () => {
    expect(gerarCobrancaConsumer).toBeDefined();
    expect(gerarCobrancaUseCase).toBeDefined();
    expect(csvCobrancaRepository).toBeDefined();
    expect(csvReader).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'findOne')
      .mockResolvedValue(mockArquivoCobrancaEntity);

    jest.spyOn(csvReader, 'read').mockResolvedValue([
      {
        name: 'Eduardo',
        governmentId: '123',
        email: 'es.eduardoconti@gmail.com',
        debtAmount: '100.00',
        debtDueDate: new Date(),
        debtId: '123',
      },
    ]);
    jest
      .spyOn(gerarCobrancaUseCase, 'execute')
      .mockResolvedValue(mockGerarCobrancaUseCaseOutput);

    await gerarCobrancaConsumer.handle({
      idCsvCobranca: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
    });

    expect(csvCobrancaRepository.findOne).toBeCalled();
    expect(csvReader.read).toBeCalled();
    expect(gerarCobrancaUseCase.execute).toBeCalled();
  });

  it('should be return when csv already processed', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'findOne')
      .mockResolvedValue(mockArquivoCobrancaEntityProcessado);

    await gerarCobrancaConsumer.handle({
      idCsvCobranca: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
    });

    expect(csvCobrancaRepository.findOne).toBeCalled();
    expect(csvReader.read).not.toBeCalled();
    expect(gerarCobrancaUseCase.execute).not.toBeCalled();
  });
});
