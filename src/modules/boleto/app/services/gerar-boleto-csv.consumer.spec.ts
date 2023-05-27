import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { IMailService } from '@app/contracts/mail-service';

import { mockGerarBoletoUseCaseOutput } from '@boleto/__mocks__/dto';
import {
  mockCsvCobrancaEntity,
  mockCsvCobrancaEntityProcessado,
} from '@boleto/__mocks__/entity';
import type { ICsvCobrancaRepository } from '@boleto/domain/contracts';
import type { IGerarBoletoUseCase } from '@boleto/domain/use-cases';
import { CsvCobrancaRepository } from '@boleto/infra/repositories/csv-cobranca.repository';
import { provideGerarBoletoCsvConsumer } from '@boleto/main/dependency-injection';

import { ReadFileCsv } from '@infra/csv/csv-reader';
import { MailerService } from '@infra/mailer';

import type { ICsvCobrancaReader, IProcessarCsv } from '../contracts';
import { GerarBoletoUseCase } from '../use-cases';
import { GerarBoletoCsvConsumer } from './gerar-boleto-csv.consumer';

describe('GerarBoletoCsvConsumer', () => {
  let gerarBoletoCsvConsumer: IProcessarCsv;
  let gerarBoletoUseCase: IGerarBoletoUseCase;
  let mailService: IMailService;
  let csvCobrancaRepository: ICsvCobrancaRepository;
  let csvReader: ICsvCobrancaReader;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideGerarBoletoCsvConsumer,
        {
          provide: GerarBoletoUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            send: jest.fn(),
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

    gerarBoletoCsvConsumer = app.get<IProcessarCsv>(GerarBoletoCsvConsumer);
    gerarBoletoUseCase = app.get<IGerarBoletoUseCase>(GerarBoletoUseCase);
    mailService = app.get<IMailService>(MailerService);
    csvCobrancaRepository = app.get<ICsvCobrancaRepository>(
      CsvCobrancaRepository,
    );
    csvReader = app.get<ICsvCobrancaReader>(ReadFileCsv);
  });

  it('should be defined', () => {
    expect(gerarBoletoUseCase).toBeDefined();
    expect(mailService).toBeDefined();
    expect(csvCobrancaRepository).toBeDefined();
    expect(csvReader).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'findOne')
      .mockResolvedValue(mockCsvCobrancaEntity);

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
      .spyOn(gerarBoletoUseCase, 'execute')
      .mockResolvedValue(mockGerarBoletoUseCaseOutput);

    await gerarBoletoCsvConsumer.handle({
      idCsvCobranca: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      caminho: 'uploads/csv',
    });

    expect(csvCobrancaRepository.findOne).toBeCalled();
    expect(csvReader.read).toBeCalled();
    expect(gerarBoletoUseCase.execute).toBeCalled();
  });

  it('should be return when csv already processed', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'findOne')
      .mockResolvedValue(mockCsvCobrancaEntityProcessado);

    await gerarBoletoCsvConsumer.handle({
      idCsvCobranca: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      caminho: 'uploads/csv',
    });

    expect(csvCobrancaRepository.findOne).toBeCalled();
    expect(csvReader.read).not.toBeCalled();
    expect(gerarBoletoUseCase.execute).not.toBeCalled();
  });
});
