import { BoletoModel } from '@boleto/infra/models';

import type { StatusCobranca } from '@cobranca/domain/entities';
import { CobrancaEntity } from '@cobranca/domain/entities';

import { Amount, DateVO, Email, Nome } from '@domain-core/value-objects';
import { SerialID } from '@domain-core/value-objects/id-serial.value-object';

import { Model } from '@infra/database/model/base-model';

export class CobrancaModel extends Model<number> {
  id!: number;
  valor!: number;
  nome_devedor!: string;
  data_vencimento!: Date;
  data_pagamento?: Date | null;
  nome_pagador?: string | null;
  status!: StatusCobranca;
  email!: string;
  data_inclusao!: Date;
  data_alteracao!: Date;
  boleto?: BoletoModel[];

  static fromEntity(entity: CobrancaEntity): CobrancaModel {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      id: entity.id?.value,
      valor: entity.valor.value,
      nome_devedor: entity.nomeDevedor.value,
      data_vencimento: entity.dataVencimento.value,
      data_pagamento: entity.dataPagamento?.value ?? null,
      nome_pagador: entity.nomePagador?.value ?? null,
      status: entity.status,
      email: entity.email.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      boleto: entity.props.boleto
        ? [BoletoModel.fromEntity(entity.props.boleto)]
        : undefined,
    };
  }

  static toEntity({
    id,
    valor,
    nome_devedor,
    nome_pagador,
    data_vencimento,
    data_pagamento,
    status,
    email,
    data_inclusao,
    data_alteracao,
    boleto,
  }: CobrancaModel): CobrancaEntity {
    return new CobrancaEntity({
      id: new SerialID(id),
      dataInclusao: new DateVO(data_inclusao),
      dataAlteracao: new DateVO(data_alteracao),
      props: {
        valor: new Amount(valor),
        nomeDevedor: new Nome(nome_devedor),
        status,
        email: new Email(email),
        dataVencimento: new DateVO(data_vencimento),
        dataPagamento: data_pagamento ? new DateVO(data_pagamento) : undefined,
        nomePagador: nome_pagador ? new Nome(nome_pagador) : undefined,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        boleto: boleto?.length ? BoletoModel.toEntity(boleto[0]) : undefined,
      },
    });
  }
}
