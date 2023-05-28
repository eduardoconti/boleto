/* eslint-disable @typescript-eslint/no-magic-numbers */
import { BoletoEntity, WebhookEntity } from '@boleto/domain/entities';

import { Amount, DateVO, Nome, UUID } from '@domain-core/value-objects';
import { SerialID } from '@domain-core/value-objects/id-serial.value-object';

export const mockBoletoEntityPago: BoletoEntity = new BoletoEntity({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    nomeDevedor: new Nome('Eduardo Conti'),
    nomePagador: new Nome('Eduardo Conti'),
    status: 'PAGO',
    dataVencimento: new DateVO(new Date()),
    dataPagamento: new DateVO(new Date()),
    idCobranca: new SerialID(1),
    pspId: '101',
    valor: new Amount(1000),
    valorPago: new Amount(1000),
    linhaDigitavel: 'asdf',
  },
});

export const mockBoletoEntityPendente: BoletoEntity = new BoletoEntity({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    nomeDevedor: new Nome('Eduardo Conti'),
    status: 'PENDENTE',
    dataVencimento: new DateVO(new Date()),
    idCobranca: new SerialID(1),
    pspId: '101',
    valor: new Amount(1000),
    linhaDigitavel: 'asdf',
  },
});

export const mockWebhookEntity: WebhookEntity = new WebhookEntity({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    dataPagamento: new DateVO(new Date()),
    idCobranca: '1',
    payload: '',
    valorPago: new Amount(10),
  },
});
