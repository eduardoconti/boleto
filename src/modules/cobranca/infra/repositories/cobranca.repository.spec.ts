import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { cobranca } from '@prisma/client';

import { mockCobrancaEntityPendente } from '@cobranca/__mocks__/entity';
import type { ICobrancaRepository } from '@cobranca/domain/contracts/cobranca-repository';
import { provideCobrancaRepository } from '@cobranca/main/dependency-injection';

import { PrismaService } from '@infra/database/prisma';

import {
  CobrancaNotFoundException,
  CobrancaRepositoryException,
} from '../exceptions';
import { CobrancaModel } from '../models/cobranca.model';
import { CobrancaRepository } from './cobranca.repository';

describe('CobrancaRepository', () => {
  let cobrancaRepository: ICobrancaRepository;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        provideCobrancaRepository,
        {
          provide: PrismaService,
          useValue: {
            cobranca: {
              create: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    cobrancaRepository = module.get<ICobrancaRepository>(CobrancaRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(cobrancaRepository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('save', () => {
    it('shouls save cobranca successfully', async () => {
      const model = CobrancaModel.fromEntity(mockCobrancaEntityPendente);

      jest
        .spyOn(prismaService.cobranca, 'create')
        .mockResolvedValue(model as cobranca);
      const result = await cobrancaRepository.save(mockCobrancaEntityPendente);
      expect(result).toBeDefined();
    });

    it('should throw CobrancaRepositoryException when prisma failed', async () => {
      jest
        .spyOn(prismaService.cobranca, 'create')
        .mockRejectedValue(new Error('db error'));

      await expect(
        cobrancaRepository.save(mockCobrancaEntityPendente),
      ).rejects.toThrowError(CobrancaRepositoryException);
    });
  });

  describe('findOne', () => {
    it('shouls findOne by Id successfully', async () => {
      const model = CobrancaModel.fromEntity(mockCobrancaEntityPendente);

      jest
        .spyOn(prismaService.cobranca, 'findFirst')
        .mockResolvedValue(model as cobranca);
      const result = await cobrancaRepository.findOne({
        id: mockCobrancaEntityPendente.id,
      });
      expect(result).toBeDefined();
    });

    it('shouls findOne by Email successfully', async () => {
      const model = CobrancaModel.fromEntity(mockCobrancaEntityPendente);

      jest
        .spyOn(prismaService.cobranca, 'findFirst')
        .mockResolvedValue(model as cobranca);
      const result = await cobrancaRepository.findOne({
        email: mockCobrancaEntityPendente.props.email,
      });
      expect(result).toBeDefined();
    });

    it('should throw CobrancaRepositoryException when prisma failed', async () => {
      jest
        .spyOn(prismaService.cobranca, 'findFirst')
        .mockRejectedValue(new Error('db error'));

      await expect(
        cobrancaRepository.findOne(mockCobrancaEntityPendente),
      ).rejects.toThrowError(CobrancaRepositoryException);
    });

    it('should throw CobrancaNotFoundException when register does exists', async () => {
      jest.spyOn(prismaService.cobranca, 'findFirst').mockResolvedValue(null);

      await expect(
        cobrancaRepository.findOne(mockCobrancaEntityPendente),
      ).rejects.toThrowError(CobrancaNotFoundException);
    });
  });

  describe('update', () => {
    it('shouls update cobranca successfully', async () => {
      const model = CobrancaModel.fromEntity(mockCobrancaEntityPendente);

      jest
        .spyOn(prismaService.cobranca, 'update')
        .mockResolvedValue(model as cobranca);
      const result = await cobrancaRepository.update(
        mockCobrancaEntityPendente,
      );
      expect(result).toBeDefined();
    });

    it('should throw CobrancaRepositoryException when prisma failed', async () => {
      jest
        .spyOn(prismaService.cobranca, 'update')
        .mockRejectedValue(new Error('db error'));

      await expect(
        cobrancaRepository.update(mockCobrancaEntityPendente),
      ).rejects.toThrowError(CobrancaRepositoryException);
    });
  });
});
