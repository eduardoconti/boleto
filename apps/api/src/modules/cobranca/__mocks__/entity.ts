/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  mockBoletoEntityPago,
  mockBoletoEntityPendente,
} from '@boleto/__mocks__/entity';

import { CobrancaEntity } from '@cobranca/domain/entities';
import { ArquivoCobrancaEntity } from '@cobranca/domain/entities/arquivo-cobranca.entity';

import { Amount, DateVO, Email, Nome, UUID } from '@domain-core/value-objects';
import { SerialID } from '@domain-core/value-objects/id-serial.value-object';

const fakeData = new Date(`2023-01-01`);
export const mockArquivoCobrancaEntity: ArquivoCobrancaEntity =
  new ArquivoCobrancaEntity({
    id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
    dataInclusao: new DateVO(fakeData),
    dataAlteracao: new DateVO(fakeData),
    props: {
      caminho: 'cobranca-15f6a357-1baa-4a3c-b1c8-b434eb635ded',
      processado: false,
    },
  });

export const mockArquivoCobrancaEntityProcessado: ArquivoCobrancaEntity =
  new ArquivoCobrancaEntity({
    id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
    dataInclusao: new DateVO(fakeData),
    dataAlteracao: new DateVO(fakeData),
    props: {
      caminho: 'cobranca-15f6a357-1baa-4a3c-b1c8-b434eb635ded',
      processado: true,
    },
  });

export const mockCobrancaEntityPago: CobrancaEntity = new CobrancaEntity({
  id: new SerialID(1),
  dataInclusao: new DateVO(fakeData),
  dataAlteracao: new DateVO(fakeData),
  props: {
    nomeDevedor: new Nome('Eduardo Conti'),
    nomePagador: new Nome('Eduardo Conti'),
    status: 'PAGO',
    dataVencimento: new DateVO(fakeData),
    dataPagamento: new DateVO(fakeData),
    valor: new Amount(1000),
    valorPago: new Amount(1000),
    email: new Email('es.eduardoconti@gmail.com'),
    boleto: mockBoletoEntityPago,
  },
});

export const mockCobrancaEntityPendente: CobrancaEntity = new CobrancaEntity({
  id: new SerialID(1),
  dataInclusao: new DateVO(fakeData),
  dataAlteracao: new DateVO(fakeData),
  props: {
    nomeDevedor: new Nome('Eduardo Conti'),
    status: 'EM_ABERTO',
    dataVencimento: new DateVO(fakeData),
    email: new Email('es.eduardoconti@gmail.com'),
    valor: new Amount(1000),
    boleto: mockBoletoEntityPendente,
  },
});

export const mockCobrancaEntityPendenteSemBoleto: CobrancaEntity =
  new CobrancaEntity({
    id: new SerialID(1),
    dataInclusao: new DateVO(fakeData),
    dataAlteracao: new DateVO(fakeData),
    props: {
      nomeDevedor: new Nome('Eduardo Conti'),
      status: 'EM_ABERTO',
      dataVencimento: new DateVO(fakeData),
      email: new Email('es.eduardoconti@gmail.com'),
      valor: new Amount(1000),
      boleto: undefined,
    },
  });

export const mockCobrancaEntityFalha: CobrancaEntity = new CobrancaEntity({
  id: new SerialID(1),
  dataInclusao: new DateVO(fakeData),
  dataAlteracao: new DateVO(fakeData),
  props: {
    nomeDevedor: new Nome('Eduardo Conti'),
    status: 'FALHA_GERAR_BOLETO',
    dataVencimento: new DateVO(fakeData),
    email: new Email('es.eduardoconti@gmail.com'),
    valor: new Amount(1000),
    boleto: undefined,
  },
});
