import { Amount, DateVO, Email, Nome, UUID } from '@domain-core/value-objects';

import { Model } from '@infra/database/model/base-model';

import type { StatusBoleto } from '../../domain/entities';
import { BoletoEntity } from '../../domain/entities';

export class BoletoModel extends Model {
  id!: string;
  id_cobranca!: string;
  id_psp!: string;
  valor!: number;
  nome_devedor!: string;
  data_vencimento!: Date;
  data_pagamento?: Date | null;
  nome_pagador?: string | null;
  status!: StatusBoleto;
  email!: string;
  data_inclusao!: Date;
  data_alteracao!: Date;
  static fromEntity(entity: BoletoEntity): BoletoModel {
    return {
      id: entity.id.value,
      id_cobranca: entity.idCobranca,
      id_psp: entity.pspId,
      valor: entity.valor.value,
      nome_devedor: entity.nomeDevedor.value,
      data_vencimento: entity.dataVencimento.value,
      data_pagamento: entity.dataPagamento?.value ?? null,
      nome_pagador: entity.nomePagador?.value ?? null,
      status: entity.status,
      email: entity.email.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
    };
  }

  static toEntity({
    id,
    id_cobranca,
    id_psp,
    valor,
    nome_devedor,
    nome_pagador,
    data_vencimento,
    data_pagamento,
    status,
    email,
    data_inclusao,
    data_alteracao,
  }: BoletoModel): BoletoEntity {
    return new BoletoEntity({
      id: new UUID(id),
      dataInclusao: new DateVO(data_inclusao),
      dataAlteracao: new DateVO(data_alteracao),
      props: {
        idCobranca: id_cobranca,
        pspId: id_psp,
        valor: new Amount(valor),
        nomeDevedor: new Nome(nome_devedor),
        status,
        email: new Email(email),
        dataVencimento: new DateVO(data_vencimento),
        dataPagamento: data_pagamento ? new DateVO(data_pagamento) : undefined,
        nomePagador: nome_pagador ? new Nome(nome_pagador) : undefined,
      },
    });
  }
}
