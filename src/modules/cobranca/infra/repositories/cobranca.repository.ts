import { Injectable } from '@nestjs/common';

import type { ICobrancaRepository } from '@cobranca/domain/contracts';

import type { QueryParams } from '@domain-core/contracts';
import { DateVO } from '@domain-core/value-objects';

import { PrismaService } from '@infra/database/prisma';

import type { CobrancaEntity, CobrancaProps } from '../../domain/entities';
import {
  CobrancaNotFoundException,
  CobrancaRepositoryException,
} from '../exceptions';
import { CobrancaModel } from '../models';

const boleto_position = 0;
@Injectable()
export class CobrancaRepository implements ICobrancaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: CobrancaEntity): Promise<CobrancaEntity> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { boleto, id, ...model } = CobrancaModel.fromEntity(entity);

      const saved = await this.prismaService.cobranca.create({
        data: model,
        include: { boleto: { where: { status: 'PENDENTE' } } },
      });

      return CobrancaModel.toEntity(saved);
    } catch (e) {
      throw new CobrancaRepositoryException(
        'failed to create cobranca on database',
        e,
      );
    }
  }

  async findOne(params: QueryParams<CobrancaProps>): Promise<CobrancaEntity> {
    const model = await this.prismaService.cobranca
      .findFirst({
        where: {
          id: params.id?.value as number,
          boleto: { some: { id_psp: params.boleto?.pspId } },
        },
        include: { boleto: { where: { status: 'PENDENTE' } } },
      })
      .catch((e) => {
        throw new CobrancaRepositoryException(
          'failed to find boleto on database',
          e,
        );
      });

    if (!model) {
      throw new CobrancaNotFoundException('Cobranca not found');
    }
    return CobrancaModel.toEntity(model);
  }

  async update(entity: CobrancaEntity): Promise<CobrancaEntity> {
    const { id, valor, nome_pagador, data_pagamento, status, boleto } =
      CobrancaModel.fromEntity(entity);

    try {
      const data = {
        valor,
        nome_pagador,
        data_pagamento,
        status,
        data_alteracao: DateVO.now().value,
        boleto: {},
      };
      if (boleto?.length) {
        data.boleto = {
          connectOrCreate: {
            create: {
              data_vencimento: boleto[boleto_position].data_vencimento,
              id: boleto[boleto_position].id,
              id_psp: boleto[boleto_position].id_psp,
              linha_digitavel: boleto[boleto_position].linha_digitavel,
              nome_devedor: boleto[boleto_position].nome_devedor,
              status: boleto[boleto_position].status,
              valor: boleto[boleto_position].valor,
              data_pagamento: boleto[boleto_position].data_pagamento,
              nome_pagador: boleto[boleto_position].nome_pagador,
              data_inclusao: boleto[boleto_position].data_inclusao,
              data_alteracao: boleto[boleto_position].data_alteracao,
            },
            where: { id: boleto[boleto_position].id },
          },
          update: {
            data: {
              data_vencimento: boleto[boleto_position].data_vencimento,
              id_psp: boleto[boleto_position].id_psp,
              linha_digitavel: boleto[boleto_position].linha_digitavel,
              nome_devedor: boleto[boleto_position].nome_devedor,
              status: boleto[boleto_position].status,
              valor: boleto[boleto_position].valor,
              data_pagamento: boleto[boleto_position].data_pagamento,
              nome_pagador: boleto[boleto_position].nome_pagador,
              data_alteracao: DateVO.now().value,
            },
            where: { id: boleto[boleto_position].id },
          },
        };
      }
      const saved = await this.prismaService.cobranca.update({
        data,
        where: { id },
        include: { boleto: { where: { status: 'PENDENTE' } } },
      });
      return CobrancaModel.toEntity(saved as CobrancaModel);
    } catch (e) {
      throw new CobrancaRepositoryException(
        'failed to update cobranca on database',
        e,
      );
    }
  }
}
