import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { boleto } from '@prisma/client';

import { mockBoletoEntityPendente } from '@boleto/__mocks__/entity';
import type { IBoletoRepository } from '@boleto/domain/contracts/boleto-repository';
import { provideBoletoRepository } from '@boleto/main/dependency-injection';

import { PrismaService } from '@infra/database/prisma';

import {
  BoletoNotFoundException,
  BoletoRepositoryException,
} from '../exceptions';
import { BoletoModel } from '../models/boleto.model';
import { BoletoRepository } from './boleto.repository';

describe('BoletoRepository', () => {
  let boletoRepository: IBoletoRepository;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        provideBoletoRepository,
        {
          provide: PrismaService,
          useValue: {
            boleto: {
              create: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    boletoRepository = module.get<IBoletoRepository>(BoletoRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(boletoRepository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('save', () => {
    it('shouls save boleto successfully', async () => {
      const model = BoletoModel.fromEntity(mockBoletoEntityPendente);

      jest
        .spyOn(prismaService.boleto, 'create')
        .mockResolvedValue(model as boleto);
      const result = await boletoRepository.save(mockBoletoEntityPendente);
      expect(result).toBeDefined();
    });

    it('should throw BoletoRepositoryException when prisma failed', async () => {
      jest
        .spyOn(prismaService.boleto, 'create')
        .mockRejectedValue(new Error('db error'));

      await expect(
        boletoRepository.save(mockBoletoEntityPendente),
      ).rejects.toThrowError(BoletoRepositoryException);
    });
  });

  describe('findOne', () => {
    it('shouls findOne by Id successfully', async () => {
      const model = BoletoModel.fromEntity(mockBoletoEntityPendente);

      jest
        .spyOn(prismaService.boleto, 'findFirst')
        .mockResolvedValue(model as boleto);
      const result = await boletoRepository.findOne({
        id: mockBoletoEntityPendente.id,
      });
      expect(result).toBeDefined();
    });

    it('shouls findOne by Email successfully', async () => {
      const model = BoletoModel.fromEntity(mockBoletoEntityPendente);

      jest
        .spyOn(prismaService.boleto, 'findFirst')
        .mockResolvedValue(model as boleto);
      const result = await boletoRepository.findOne({
        email: mockBoletoEntityPendente.props.email,
      });
      expect(result).toBeDefined();
    });

    it('should throw BoletoRepositoryException when prisma failed', async () => {
      jest
        .spyOn(prismaService.boleto, 'findFirst')
        .mockRejectedValue(new Error('db error'));

      await expect(
        boletoRepository.findOne(mockBoletoEntityPendente),
      ).rejects.toThrowError(BoletoRepositoryException);
    });

    it('should throw BoletoNotFoundException when register does exists', async () => {
      jest.spyOn(prismaService.boleto, 'findFirst').mockResolvedValue(null);

      await expect(
        boletoRepository.findOne(mockBoletoEntityPendente),
      ).rejects.toThrowError(BoletoNotFoundException);
    });
  });

  describe('update', () => {
    it('shouls update boleto successfully', async () => {
      const model = BoletoModel.fromEntity(mockBoletoEntityPendente);

      jest
        .spyOn(prismaService.boleto, 'update')
        .mockResolvedValue(model as boleto);
      const result = await boletoRepository.update(mockBoletoEntityPendente);
      expect(result).toBeDefined();
    });

    it('should throw BoletoRepositoryException when prisma failed', async () => {
      jest
        .spyOn(prismaService.boleto, 'update')
        .mockRejectedValue(new Error('db error'));

      await expect(
        boletoRepository.update(mockBoletoEntityPendente),
      ).rejects.toThrowError(BoletoRepositoryException);
    });
  });
});
