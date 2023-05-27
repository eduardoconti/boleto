/* eslint-disable @typescript-eslint/no-magic-numbers */
import { BoletoEntity, CsvCobrancaEntity } from '@boleto/domain/entities';

import { Amount, DateVO, Email, Nome, UUID } from '@domain-core/value-objects';

export const mockBoletoEntityPago: BoletoEntity = new BoletoEntity({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    nomeDevedor: new Nome('Eduardo Conti'),
    nomePagador: new Nome('Eduardo Conti'),
    email: new Email('es.eduardoconti@gmail.com'),
    status: 'PAGO',
    dataVencimento: new DateVO(new Date()),
    dataPagamento: new DateVO(new Date()),
    idCobranca: '1',
    pspId: '101',
    valor: new Amount(1000),
    valorPago: new Amount(1000),
  },
});

export const mockBoletoEntityPendente: BoletoEntity = new BoletoEntity({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    nomeDevedor: new Nome('Eduardo Conti'),
    email: new Email('es.eduardoconti@gmail.com'),
    status: 'PENDENTE',
    dataVencimento: new DateVO(new Date()),
    idCobranca: '1',
    pspId: '101',
    valor: new Amount(1000),
  },
});

export const mockCsvCobrancaEntity: CsvCobrancaEntity = new CsvCobrancaEntity({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    caminho: 'cobranca-15f6a357-1baa-4a3c-b1c8-b434eb635ded',
    processado: false,
  },
});

export const mockCsvCobrancaEntityProcessado: CsvCobrancaEntity =
  new CsvCobrancaEntity({
    id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
    dataInclusao: new DateVO(new Date()),
    dataAlteracao: new DateVO(new Date()),
    props: {
      caminho: 'cobranca-15f6a357-1baa-4a3c-b1c8-b434eb635ded',
      processado: true,
    },
  });
