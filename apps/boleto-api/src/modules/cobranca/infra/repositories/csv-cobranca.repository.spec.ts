import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockArquivoCobrancaEntity } from '@cobranca/__mocks__/entity';
import type { ICsvCobrancaRepository } from '@cobranca/domain/contracts';
import { provideCsvCobrancaRepository } from '@cobranca/main/dependency-injection';

import { PrismaService } from '@infra/database/prisma';

import { CsvCobrancaRepositoryException } from '../exceptions';
import { CsvCobrancaModel } from '../models';
import { CsvCobrancaRepository } from './csv-cobranca.repository';

describe('CsvCobrancaRepository', () => {
  let csvCobrancaRepository: ICsvCobrancaRepository;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        provideCsvCobrancaRepository,
        {
          provide: PrismaService,
          useValue: {
            cobranca_arquivo: {
              create: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    csvCobrancaRepository = module.get<ICsvCobrancaRepository>(
      CsvCobrancaRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(csvCobrancaRepository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('save', () => {
    it('should save csv successfully', async () => {
      const model = CsvCobrancaModel.fromEntity(mockArquivoCobrancaEntity);

      jest
        .spyOn(prismaService.cobranca_arquivo, 'create')
        .mockResolvedValue(model);
      const result = await csvCobrancaRepository.save(
        mockArquivoCobrancaEntity,
      );
      expect(result).toBeDefined();
    });

    it('should throw CsvCobrancaRepositoryException when prisma failed', async () => {
      jest
        .spyOn(prismaService.cobranca_arquivo, 'create')
        .mockRejectedValue(new Error('db error'));

      await expect(
        csvCobrancaRepository.save(mockArquivoCobrancaEntity),
      ).rejects.toThrowError(CsvCobrancaRepositoryException);
    });
  });
});
