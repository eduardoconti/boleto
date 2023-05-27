import type { IGerarBoletoUseCaseInput } from '@boleto/domain/use-cases';
import type { IGerarBoletoUseCaseOutput } from '@boleto/domain/use-cases';

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
