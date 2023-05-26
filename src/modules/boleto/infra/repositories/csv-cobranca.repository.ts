import { Injectable } from '@nestjs/common';

import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import type {
  CsvCobrancaEntity,
  CsvCobrancaProps,
} from '@boleto/domain/entities';

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

  async save(entity: CsvCobrancaEntity): Promise<CsvCobrancaEntity> {
    try {
      const model = CsvCobrancaModel.fromEntity(entity);

      const saved = await this.prismaService.boleto_csv.create({
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
    params: QueryParams<CsvCobrancaProps>,
  ): Promise<CsvCobrancaEntity> {
    const model = await this.prismaService.boleto_csv
      .findFirst({
        where: {
          id: params.id?.value,
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

  async update(entity: CsvCobrancaEntity): Promise<CsvCobrancaEntity> {
    try {
      const { id, processado, caminho } = CsvCobrancaModel.fromEntity(entity);

      const updated = await this.prismaService.boleto_csv.update({
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
