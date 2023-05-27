import { AggregateRoot } from '@domain-core/contracts';
import { DateVO } from '@domain-core/value-objects';
import { Amount, UUID } from '@domain-core/value-objects';

export interface WebhookProps {
  payload: string;
  valorPago: Amount;
  idCobranca: string;
  dataPagamento: DateVO;
}

export interface WebhookPrimitiveProps {
  id: string;
  payload: string;
  valorPago: number;
  idCobranca: string;
  dataPagamento: Date;
  dataInclusao: Date;
  dataAlteracao: Date;
}

export class WebhookEntity extends AggregateRoot<WebhookProps> {
  protected readonly _id!: UUID;

  get idCobranca(): string {
    return this.props.idCobranca;
  }

  get valorPago(): Amount {
    return this.props.valorPago;
  }
  static create(
    props: Omit<WebhookPrimitiveProps, 'id' | 'dataAlteracao' | 'dataInclusao'>,
  ): WebhookEntity {
    const id = UUID.generate();
    const { payload, valorPago, idCobranca, dataPagamento } = props;
    const entity = new WebhookEntity({
      id,
      props: {
        valorPago: new Amount(valorPago),
        idCobranca,
        dataPagamento: new DateVO(dataPagamento),
        payload,
      },
    });

    return entity;
  }
}
