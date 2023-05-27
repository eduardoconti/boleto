import type { BoletoEntity } from '@boleto/domain/entities';

import { Entity } from '@domain-core/contracts';
import { ArgumentInvalidException } from '@domain-core/exceptions';
import { Amount, DateVO } from '@domain-core/value-objects';
import { Email } from '@domain-core/value-objects/email.value-object';
import type { SerialID } from '@domain-core/value-objects/id-serial.value-object';
import { Nome } from '@domain-core/value-objects/nome.value-object';

export type StatusCobranca =
  | 'EM_ABERTO'
  | 'PAGO'
  | 'VENCIDA'
  | 'FALHA_GERAR_BOLETO';

export interface CobrancaProps {
  email: Email;
  valor: Amount;
  status: StatusCobranca;
  dataVencimento: DateVO;
  nomeDevedor: Nome;
  valorPago?: Amount;
  nomePagador?: Nome;
  dataPagamento?: DateVO;
  boleto?: BoletoEntity;
}

export interface CobrancaPrimitivesProps {
  id: number;
  idCobranca: string;
  email: string;
  pspId: string;
  valor: number;
  dataVencimento: Date;
  status: StatusCobranca;
  nomeDevedor: string;
  dataInclusao: Date;
  dataAlteracao: Date;
  valorPago?: number;
  nomePagador?: string;
  dataPagamento?: Date;
}

export class CobrancaEntity extends Entity<CobrancaProps> {
  protected readonly _id!: SerialID;

  get id(): SerialID {
    return this._id;
  }

  get email(): Email {
    return this.props.email;
  }

  get valor(): Amount {
    return this.props.valor;
  }

  get dataVencimento(): DateVO {
    return this.props.dataVencimento;
  }

  get status(): StatusCobranca {
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

  get boleto(): BoletoEntity {
    if (!this.props.boleto)
      throw new ArgumentInvalidException('boleto not found');

    return this.props.boleto;
  }

  static create({
    email,
    valor,
    dataVencimento,
    nomeDevedor,
  }: Pick<
    CobrancaPrimitivesProps,
    'email' | 'valor' | 'dataVencimento' | 'nomeDevedor'
  >): CobrancaEntity {
    return new CobrancaEntity({
      props: {
        email: new Email(email),
        valor: new Amount(valor),
        dataVencimento: new DateVO(dataVencimento),
        status: 'EM_ABERTO',
        nomeDevedor: new Nome(nomeDevedor),
      },
    });
  }

  marcarComoPago({
    valorPago,
    nomePagador,
    dataPagamento,
  }: {
    valorPago: number;
    nomePagador: string;
    dataPagamento: Date;
  }): void {
    if (this.props.status === 'EM_ABERTO') {
      this.props.nomePagador = new Nome(nomePagador);
      this.props.dataPagamento = new DateVO(dataPagamento);
      this.props.valorPago = new Amount(valorPago);
      this.props.status = 'PAGO';

      this.boleto.realizarPagamento({
        valorPago: valorPago,
        nomePagador: nomePagador,
      });
    }
  }

  addBoleto(boleto: BoletoEntity): void {
    this.props.boleto = boleto;
  }
}
