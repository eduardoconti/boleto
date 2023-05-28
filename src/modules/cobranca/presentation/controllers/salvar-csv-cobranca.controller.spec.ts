import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { SalvarCsvCobrancaUseCase } from '@cobranca/app/use-cases';
import type { ISalvarCsvCobrancaUseCase } from '@cobranca/domain/use-cases';

import { SalvarCsvCobrancaController } from './salvar-csv-cobranca.controller';

describe('SalvarCsvCobrancaController', () => {
  let controller: SalvarCsvCobrancaController;
  let salvarCsvCobrancaUseCase: ISalvarCsvCobrancaUseCase;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SalvarCsvCobrancaController],
      providers: [
        {
          provide: SalvarCsvCobrancaUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get(SalvarCsvCobrancaController);
    salvarCsvCobrancaUseCase = app.get<ISalvarCsvCobrancaUseCase>(
      SalvarCsvCobrancaUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(salvarCsvCobrancaUseCase).toBeDefined();
  });

  it('should execute controller successfully', async () => {
    jest
      .spyOn(salvarCsvCobrancaUseCase, 'execute')
      .mockResolvedValue({ id: '', caminho: '' });
    await controller.handle({
      buffer: {} as Buffer,
      path: '',
    } as Express.Multer.File);
    expect(salvarCsvCobrancaUseCase.execute).toBeCalled();
  });
});
