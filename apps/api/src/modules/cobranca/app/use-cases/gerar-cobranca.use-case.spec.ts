import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { IMailService } from '@app/contracts/mail-service';

import { mockGerarBoletoComPSPResponse } from '@boleto/__mocks__/service';
import type { IGerarBoletoComPSP } from '@boleto/app/contracts';
import { GerarBoletoItauService } from '@boleto/infra/psp-services/itau/gerar-boleto-itau.service';

import { mockGerarCobrancaUseCaseInput } from '@cobranca/__mocks__/dto';
import {
  mockCobrancaEntityFalha,
  mockCobrancaEntityPendente,
  mockCobrancaEntityPendenteSemBoleto,
} from '@cobranca/__mocks__/entity';
import type { ICobrancaRepository } from '@cobranca/domain/contracts/cobranca-repository';
import type { IGerarCobrancaUseCase } from '@cobranca/domain/use-cases';
import { CobrancaRepository } from '@cobranca/infra/repositories';
import { provideGerarCobrancaUseCase } from '@cobranca/main/dependency-injection';

import { MailerService } from '@infra/mailer';

import { GerarCobrancaUseCase } from './gerar-cobranca.use-case';

describe('GerarCobrancaUseCase', () => {
  let gerarCobrancaUseCase: IGerarCobrancaUseCase;
  let csvCobrancaRepository: ICobrancaRepository;
  let pspService: IGerarBoletoComPSP;
  let mailerService: IMailService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideGerarCobrancaUseCase,
        {
          provide: CobrancaRepository,
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: GerarBoletoItauService,
          useValue: {
            gerarBoleto: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    gerarCobrancaUseCase = app.get<IGerarCobrancaUseCase>(GerarCobrancaUseCase);
    csvCobrancaRepository = app.get<ICobrancaRepository>(CobrancaRepository);
    pspService = app.get<IGerarBoletoComPSP>(GerarBoletoItauService);
    mailerService = app.get<IMailService>(MailerService);
  });

  it('should be defined', () => {
    expect(gerarCobrancaUseCase).toBeDefined();
    expect(csvCobrancaRepository).toBeDefined();
    expect(pspService).toBeDefined();
    expect(mailerService).toBeDefined();
  });

  it('should execute successfully', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'save')
      .mockResolvedValue(mockCobrancaEntityPendente);

    jest
      .spyOn(csvCobrancaRepository, 'update')
      .mockResolvedValue(mockCobrancaEntityPendente);

    jest
      .spyOn(pspService, 'gerarBoleto')
      .mockResolvedValue(mockGerarBoletoComPSPResponse);

    jest.spyOn(mailerService, 'send').mockResolvedValue();
    const result = await gerarCobrancaUseCase.execute(
      mockGerarCobrancaUseCaseInput,
    );
    expect(result).toBeDefined();
  });

  it('should throw error and mark charge as FALHA_GERAR_BOLETO', async () => {
    jest
      .spyOn(csvCobrancaRepository, 'save')
      .mockResolvedValue(mockCobrancaEntityPendenteSemBoleto);

    jest.spyOn(pspService, 'gerarBoleto').mockRejectedValue(new Error(`any`));

    jest
      .spyOn(csvCobrancaRepository, 'update')
      .mockResolvedValue(mockCobrancaEntityFalha);

    await expect(
      gerarCobrancaUseCase.execute(mockGerarCobrancaUseCaseInput),
    ).rejects.toThrowError(Error);

    expect(csvCobrancaRepository.update).toBeCalledWith(
      mockCobrancaEntityFalha,
    );
  });
});
