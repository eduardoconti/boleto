import { Injectable } from '@nestjs/common';

import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import type { CsvCobrancaEntity } from '@boleto/domain/entities';

import { PrismaService } from '@infra/database/prisma';

import { CsvCobrancaRepositoryException } from '../exceptions';
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
}
