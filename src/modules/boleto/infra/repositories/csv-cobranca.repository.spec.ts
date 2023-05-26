import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockCsvCobrancaEntity } from '@boleto/__mocks__/entity';
import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import { provideCsvCobrancaRepository } from '@boleto/main/dependency-injection';

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
            boleto_csv: {
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
      const model = CsvCobrancaModel.fromEntity(mockCsvCobrancaEntity);

      jest.spyOn(prismaService.boleto_csv, 'create').mockResolvedValue(model);
      const result = await csvCobrancaRepository.save(mockCsvCobrancaEntity);
      expect(result).toBeDefined();
    });

    it('should throw CsvCobrancaRepositoryException when prisma failed', async () => {
      jest
        .spyOn(prismaService.boleto_csv, 'create')
        .mockRejectedValue(new Error('db error'));

      await expect(
        csvCobrancaRepository.save(mockCsvCobrancaEntity),
      ).rejects.toThrowError(CsvCobrancaRepositoryException);
    });
  });
});
