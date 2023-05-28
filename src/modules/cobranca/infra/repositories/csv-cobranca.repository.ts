import { Injectable } from '@nestjs/common';

import type { ICsvCobrancaRepository } from '@cobranca/domain/contracts';
import type {
  ArquivoCobrancaEntity,
  ArquivoCobrancaProps,
} from '@cobranca/domain/entities/arquivo-cobranca.entity';

import type { QueryParams } from '@domain-core/contracts';
import { DateVO } from '@domain-core/value-objects';

import { PrismaService } from '@infra/database/prisma';

import {
  CsvCobrancaNotFoundException,
  CsvCobrancaRepositoryException,
} from '../exceptions';
import { CsvCobrancaModel } from '../models';

@Injectable()
export class CsvCobrancaRepository implements ICsvCobrancaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: ArquivoCobrancaEntity): Promise<ArquivoCobrancaEntity> {
    try {
      const model = CsvCobrancaModel.fromEntity(entity);

      const saved = await this.prismaService.cobranca_arquivo.create({
        data: model,
      });
      return CsvCobrancaModel.toEntity(saved);
    } catch (e) {
      throw new CsvCobrancaRepositoryException(
        'failed to save csv info on database',
        e,
      );
    }
  }

  async findOne(
    params: QueryParams<ArquivoCobrancaProps>,
  ): Promise<ArquivoCobrancaEntity> {
    const model = await this.prismaService.cobranca_arquivo
      .findFirst({
        where: {
          id: params.id?.value as string,
        },
      })
      .catch((e) => {
        throw new CsvCobrancaRepositoryException(
          'failed to find csv info on database',
          e,
        );
      });

    if (!model) {
      throw new CsvCobrancaNotFoundException('csv info not found');
    }
    return CsvCobrancaModel.toEntity(model);
  }

  async update(entity: ArquivoCobrancaEntity): Promise<ArquivoCobrancaEntity> {
    try {
      const { id, processado, caminho } = CsvCobrancaModel.fromEntity(entity);

      const updated = await this.prismaService.cobranca_arquivo.update({
        where: { id },
        data: {
          processado,
          caminho,
          data_alteracao: DateVO.now().value,
        },
      });
      return CsvCobrancaModel.toEntity(updated);
    } catch (e) {
      throw new CsvCobrancaRepositoryException(
        'failed to update csv info on database',
        e,
      );
    }
  }
}
