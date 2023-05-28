import { WebhookEntity } from '@boleto/domain/entities';

import { Amount, DateVO, UUID } from '@domain-core/value-objects';

import { Model } from '@infra/database/model/base-model';

export class WebhookModel extends Model<string> {
  id!: string;
  payload!: string;
  id_cobranca!: string;
  data_pagamento!: Date;
  valor_pago!: number;
  data_inclusao!: Date;
  data_alteracao!: Date;
  static fromEntity(entity: WebhookEntity): WebhookModel {
    return {
      id: entity.id.value,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
      data_pagamento: entity.props.dataPagamento.value,
      id_cobranca: entity.props.idCobranca,
      payload: entity.props.payload,
      valor_pago: entity.props.valorPago.value,
    };
  }

  static toEntity({
    id,
    payload,
    id_cobranca,
    data_pagamento,
    valor_pago,
    data_inclusao,
    data_alteracao,
  }: WebhookModel): WebhookEntity {
    return new WebhookEntity({
      id: new UUID(id),
      dataInclusao: new DateVO(data_inclusao),
      dataAlteracao: new DateVO(data_alteracao),
      props: {
        payload,
        dataPagamento: new DateVO(data_pagamento),
        idCobranca: id_cobranca,
        valorPago: new Amount(valor_pago),
      },
    });
  }
}
