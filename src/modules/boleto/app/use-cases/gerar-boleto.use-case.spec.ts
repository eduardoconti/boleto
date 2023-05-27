import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockGerarBoletoUseCaseInput } from '@boleto/__mocks__/dto';
import { mockBoletoEntityPago } from '@boleto/__mocks__/entity';
import { mockGerarBoletoComPSPResponse } from '@boleto/__mocks__/service';
import type { IBoletoRepository } from '@boleto/domain/contracts/boleto-repository';
import type { IGerarBoletoUseCase } from '@boleto/domain/use-cases';
import { GerarBoletoItauService } from '@boleto/infra/psp-services/itau/gerar-boleto-itau.service';
import { BoletoRepository } from '@boleto/infra/repositories';
import { provideGerarBoletoUseCase } from '@boleto/main/dependency-injection';

import type { IGerarBoletoComPSP } from '../contracts';
import { GerarBoletoUseCase } from './gerar-boleto.use-case';

describe('GerarBoletoUseCase', () => {
  let gerarBoletoUseCase: IGerarBoletoUseCase;
  let csvCobrancaRepository: IBoletoRepository;
  let pspService: IGerarBoletoComPSP;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideGerarBoletoUseCase,
        {
          provide: BoletoRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: GerarBoletoItauService,
          useValue: {
            gerarBoleto: jest.fn(),
          },
        },
      ],
    }).compile();

    gerarBoletoUseCase = app.get<IGerarBoletoUseCase>(GerarBoletoUseCase);
    csvCobrancaRepository = app.get<IBoletoRepository>(BoletoRepository);
    pspService = app.get<IGerarBoletoComPSP>(GerarBoletoItauService);
  });

  it('should be defined', () => {
    expect(gerarBoletoUseCase).toBeDefined();
    expect(csvCobrancaRepository).toBeDefined();
    expect(pspService).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'save')
      .mockResolvedValue(mockBoletoEntityPago);

    jest
      .spyOn(pspService, 'gerarBoleto')
      .mockResolvedValue(mockGerarBoletoComPSPResponse);
    const result = await gerarBoletoUseCase.execute(
      mockGerarBoletoUseCaseInput,
    );
    expect(result).toBeDefined();
  });
});
