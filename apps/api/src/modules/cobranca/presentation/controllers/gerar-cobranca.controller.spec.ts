import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
  mockGerarCobrancaInput,
  mockGerarCobrancaUseCaseOutput,
} from '@cobranca/__mocks__/dto';
import { GerarCobrancaUseCase } from '@cobranca/app/use-cases';
import type { IGerarCobrancaUseCase } from '@cobranca/domain/use-cases';

import { GerarCobrancaController } from './gerar-cobranca.controller';

describe('GerarCobrancaController', () => {
  let controller: GerarCobrancaController;
  let gerarCobrancaUseCase: IGerarCobrancaUseCase;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GerarCobrancaController],
      providers: [
        {
          provide: GerarCobrancaUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get(GerarCobrancaController);
    gerarCobrancaUseCase = app.get<IGerarCobrancaUseCase>(GerarCobrancaUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(gerarCobrancaUseCase).toBeDefined();
  });

  it('should execute controller with all fields', async () => {
    jest
      .spyOn(gerarCobrancaUseCase, 'execute')
      .mockResolvedValue(mockGerarCobrancaUseCaseOutput);
    const result = await controller.handle(mockGerarCobrancaInput);
    expect(result).toBeDefined();
    expect(gerarCobrancaUseCase.execute).toBeCalled();
  });
});
