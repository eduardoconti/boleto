import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
  mockGerarBoletoInput,
  mockGerarBoletoUseCaseOutput,
} from '@boleto/__mocks__/dto';
import { GerarBoletoUseCase } from '@boleto/app/use-cases';
import type { IGerarBoletoUseCase } from '@boleto/domain/use-cases';

import { GerarBoletoController } from './gerar-boleto.controller';

describe('GerarBoletoController', () => {
  let controller: GerarBoletoController;
  let gerarBoletoUseCase: IGerarBoletoUseCase;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GerarBoletoController],
      providers: [
        {
          provide: GerarBoletoUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get(GerarBoletoController);
    gerarBoletoUseCase = app.get<IGerarBoletoUseCase>(GerarBoletoUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(gerarBoletoUseCase).toBeDefined();
  });

  it('should execute controller with all fields', async () => {
    jest
      .spyOn(gerarBoletoUseCase, 'execute')
      .mockResolvedValue(mockGerarBoletoUseCaseOutput);
    const result = await controller.handle(mockGerarBoletoInput);
    expect(result).toBeDefined();
    expect(gerarBoletoUseCase.execute).toBeCalled();
  });
});
