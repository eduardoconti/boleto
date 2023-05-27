import { Entity } from '@domain-core/contracts';
import { Amount, DateVO } from '@domain-core/value-objects';
import { UUID } from '@domain-core/value-objects';
import { Email } from '@domain-core/value-objects/email.value-object';
import { Nome } from '@domain-core/value-objects/nome.value-object';

export type StatusBoleto = 'PENDENTE' | 'PAGO';

export interface BoletoProps {
  email: Email;
  idCobranca: string;
  pspId: string;
  valor: Amount;
  dataVencimento: DateVO;
  status: StatusBoleto;
  nomeDevedor: Nome;
  valorPago?: Amount;
  nomePagador?: Nome;
  dataPagamento?: DateVO;
}

export interface BoletoPrimitivesProps {
  id: string;
  idCobranca: string;
  email: string;
  pspId: string;
  valor: number;
  dataVencimento: Date;
  status: StatusBoleto;
  nomeDevedor: string;
  dataInclusao: Date;
  dataAlteracao: Date;
  valorPago?: number;
  nomePagador?: string;
  dataPagamento?: Date;
}

export class BoletoEntity extends Entity<BoletoProps> {
  protected readonly _id!: UUID;

  get email(): Email {
    return this.props.email;
  }

  get idCobranca(): string {
    return this.props.idCobranca;
  }

  get pspId(): string {
    return this.props.pspId;
  }

  get valor(): Amount {
    return this.props.valor;
  }

  get dataVencimento(): DateVO {
    return this.props.dataVencimento;
  }

  get status(): StatusBoleto {
    return this.props.status;
  }

  get nomeDevedor(): Nome {
    return this.props.nomeDevedor;
  }

  get valorpago(): Amount | undefined {
    return this.props.valorPago;
  }

  get nomePagador(): Nome | undefined {
    return this.props.nomePagador;
  }

  get dataPagamento(): DateVO | undefined {
    return this.props.dataPagamento;
  }

  static create({
    email,
    pspId,
    valor,
    dataVencimento,
    idCobranca,
    nomeDevedor,
  }: Omit<
    BoletoPrimitivesProps,
    'id' | 'dataAlteracao' | 'dataInclusao' | 'nomePagador' | 'status'
  >): BoletoEntity {
    const id = UUID.generate();

    return new BoletoEntity({
      id: id,
      props: {
        email: new Email(email),
        pspId,
        valor: new Amount(valor),
        dataVencimento: new DateVO(dataVencimento),
        status: 'PENDENTE',
        idCobranca,
        nomeDevedor: new Nome(nomeDevedor),
      },
    });
  }

  realizarPagamento({
    valorPago,
    nomePagador,
  }: {
    valorPago: number;
    nomePagador: string;
  }): void {
    if (this.props.status === 'PENDENTE') {
      this.props.nomePagador = new Nome(nomePagador);
      this.props.dataPagamento = DateVO.now();
      this.props.valorPago = new Amount(valorPago);
      this.props.status = 'PAGO';
    }
  }
}
