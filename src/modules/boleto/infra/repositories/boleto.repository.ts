import { Injectable } from '@nestjs/common';

import type { IBoletoRepository } from '@boleto/domain/contracts/boleto-repository';
import type { BoletoEntity, BoletoProps } from '@boleto/domain/entities';

import type { QueryParams } from '@domain-core/contracts';
import { DateVO } from '@domain-core/value-objects';

import { PrismaService } from '@infra/database/prisma';

import {
  BoletoNotFoundException,
  BoletoRepositoryException,
} from '../exceptions';
import { BoletoModel } from '../models';

@Injectable()
export class BoletoRepository implements IBoletoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: BoletoEntity): Promise<BoletoEntity> {
    try {
      const model = BoletoModel.fromEntity(entity);

      const saved = await this.prismaService.boleto.create({
        data: model,
      });
      return BoletoModel.toEntity(saved);
    } catch (e) {
      throw new BoletoRepositoryException(
        'failed to create boleto on database',
        e,
      );
    }
  }

  async findOne(params: QueryParams<BoletoProps>): Promise<BoletoEntity> {
    const model = await this.prismaService.boleto
      .findFirst({
        where: {
          id: params.id?.value,
          email: params.email?.value,
          id_cobranca: params.idCobranca,
        },
      })
      .catch((e) => {
        throw new BoletoRepositoryException(
          'failed to find boleto on database',
          e,
        );
      });

    if (!model) {
      throw new BoletoNotFoundException('Boleto not found');
    }
    return BoletoModel.toEntity(model);
  }

  async update(entity: BoletoEntity): Promise<BoletoEntity> {
    const { id, valor, nome_pagador, data_pagamento, status } =
      BoletoModel.fromEntity(entity);
    try {
      const saved = await this.prismaService.boleto.update({
        data: {
          valor,
          nome_pagador,
          data_pagamento,
          status,
          data_alteracao: DateVO.now().value,
        },
        where: { id },
      });
      return BoletoModel.toEntity(saved as BoletoModel);
    } catch (e) {
      throw new BoletoRepositoryException(
        'failed to update boleto on database',
        e,
      );
    }
  }
}
