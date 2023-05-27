import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockArquivoCobrancaEntity } from '@cobranca/__mocks__/entity';
import type { ICsvCobrancaRepository } from '@cobranca/domain/contracts';
import type { ISalvarCsvCobrancaUseCase } from '@cobranca/domain/use-cases';
import { GerarCobrancaPublisher } from '@cobranca/infra/publisher';
import { CsvCobrancaRepository } from '@cobranca/infra/repositories';
import { provideSalvarCsvCobrancaUseCase } from '@cobranca/main/dependency-injection';

import type { IPublisherCsvCobranca } from '../contracts';
import { SalvarCsvCobrancaUseCase } from './salvar-csv-cobranca.use-case';

describe('SalvarCsvCobrancaUseCase', () => {
  let salvarCsvCobrancaUseCase: ISalvarCsvCobrancaUseCase;
  let csvCobrancaRepository: ICsvCobrancaRepository;
  let publisherService: IPublisherCsvCobranca;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideSalvarCsvCobrancaUseCase,
        {
          provide: CsvCobrancaRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: GerarCobrancaPublisher,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    salvarCsvCobrancaUseCase = app.get<ISalvarCsvCobrancaUseCase>(
      SalvarCsvCobrancaUseCase,
    );
    csvCobrancaRepository = app.get<ICsvCobrancaRepository>(
      CsvCobrancaRepository,
    );
    publisherService = app.get<IPublisherCsvCobranca>(GerarCobrancaPublisher);
  });

  it('should be defined', () => {
    expect(salvarCsvCobrancaUseCase).toBeDefined();
    expect(csvCobrancaRepository).toBeDefined();
    expect(publisherService).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'save')
      .mockResolvedValue(mockArquivoCobrancaEntity);

    jest.spyOn(publisherService, 'publish').mockResolvedValue();
    const result = await salvarCsvCobrancaUseCase.execute({
      caminho: 'uploads/csv',
    });
    expect(result).toBeDefined();
  });
});
