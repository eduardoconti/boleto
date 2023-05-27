import type { IGerarBoletoUseCaseInput } from '@boleto/domain/use-cases';
import type { IGerarBoletoUseCaseOutput } from '@boleto/domain/use-cases';
import type { GerarBoletoInput } from '@boleto/presentation/dto/gerar-boleto-input.dto';

export const mockGerarBoletoUseCaseInput: IGerarBoletoUseCaseInput = {
  nomeDevedor: 'Eduardo Conti',
  idCobranca: '123',
  email: 'es.eduardoconti@gmail.com',
  pspId: '123',
  valor: 9000,
  dataVencimento: new Date('2023-05-26T20:46:02.264Z'),
};

export const mockGerarBoletoUseCaseOutput: IGerarBoletoUseCaseOutput = {
  nomeDevedor: 'Eduardo Conti',
  idCobranca: '123',
  email: 'es.eduardoconti@gmail.com',
  pspId: '123',
  valor: 9000,
  dataVencimento: new Date('2023-05-26T20:46:02.264Z'),
  id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  linhaDigitavel: '34191.79001 01043.510047 91020.150008 5 88110000099999',
  status: 'PENDENTE',
};

export const mockGerarBoletoInput: GerarBoletoInput = {
  nome_devedor: 'Eduardo Conti',
  id_cobranca: '123',
  email: 'es.eduardoconti@gmail.com',
  id_psp: '123',
  valor: 9000,
  data_vencimento: new Date('2023-05-27T01:54:46.698Z'),
};
