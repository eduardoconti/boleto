import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockCsvCobrancaEntity } from '@boleto/__mocks__/entity';
import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import type { ISalvarCsvCobrancaUseCase } from '@boleto/domain/use-cases';
import { GerarBoletoCsvPublisher } from '@boleto/infra/publisher/gerar-boleto-csv.publisher';
import { CsvCobrancaRepository } from '@boleto/infra/repositories/csv-cobranca.repository';
import { provideSalvarCsvCobrancaUseCase } from '@boleto/main/dependency-injection';

import type { IPublisherCsv } from '../contracts';
import { SalvarCsvCobrancaUseCase } from './salvar-csv-cobranca.use-case';

describe('SalvarCsvCobrancaUseCase', () => {
  let salvarCsvCobrancaUseCase: ISalvarCsvCobrancaUseCase;
  let csvCobrancaRepository: ICsvCobrancaRepository;
  let publisherService: IPublisherCsv;

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
          provide: GerarBoletoCsvPublisher,
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
    publisherService = app.get<IPublisherCsv>(GerarBoletoCsvPublisher);
  });

  it('should be defined', () => {
    expect(salvarCsvCobrancaUseCase).toBeDefined();
    expect(csvCobrancaRepository).toBeDefined();
    expect(publisherService).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'save')
      .mockResolvedValue(mockCsvCobrancaEntity);

    jest.spyOn(publisherService, 'publish').mockResolvedValue();
    const result = await salvarCsvCobrancaUseCase.execute({
      caminho: 'uploads/csv',
    });
    expect(result).toBeDefined();
  });
});
