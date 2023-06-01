import type { StatusBoleto } from '@boleto/domain/entities';
import { BoletoEntity } from '@boleto/domain/entities';

import { Amount, DateVO, Nome, UUID } from '@domain-core/value-objects';
import { SerialID } from '@domain-core/value-objects/id-serial.value-object';

import { Model } from '@infra/database/model/base-model';

export class BoletoModel extends Model<string> {
  id!: string;
  id_cobranca!: number;
  id_psp!: string;
  valor!: number;
  nome_devedor!: string;
  data_vencimento!: Date;
  data_pagamento?: Date | null;
  nome_pagador?: string | null;
  status!: StatusBoleto;
  data_inclusao!: Date;
  data_alteracao!: Date;
  linha_digitavel!: string;
  static fromEntity(entity: BoletoEntity): BoletoModel {
    return {
      id: entity.id.value,
      id_cobranca: entity.idCobranca.value,
      id_psp: entity.pspId,
      valor: entity.valor.value,
      nome_devedor: entity.nomeDevedor.value,
      data_vencimento: entity.dataVencimento.value,
      data_pagamento: entity.dataPagamento?.value ?? null,
      nome_pagador: entity.nomePagador?.value ?? null,
      status: entity.status,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      linha_digitavel: entity.linhaDigitavel,
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
    data_inclusao,
    data_alteracao,
    linha_digitavel,
  }: BoletoModel): BoletoEntity {
    return new BoletoEntity({
      id: new UUID(id),
      dataInclusao: new DateVO(data_inclusao),
      dataAlteracao: new DateVO(data_alteracao),
      props: {
        idCobranca: new SerialID(id_cobranca),
        pspId: id_psp,
        valor: new Amount(valor),
        nomeDevedor: new Nome(nome_devedor),
        status,
        dataVencimento: new DateVO(data_vencimento),
        dataPagamento: data_pagamento ? new DateVO(data_pagamento) : undefined,
        nomePagador: nome_pagador ? new Nome(nome_pagador) : undefined,
        linhaDigitavel: linha_digitavel,
      },
    });
  }
}
