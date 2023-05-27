import type { GerarBoletoResponse } from '@boleto/app/contracts';

export const mockGerarBoletoComPSPResponse: GerarBoletoResponse = {
  nomeDevedor: 'Eduardo Conti',
  valor: 9000,
  dataVencimento: new Date('2023-05-26T20:46:02.264Z'),
  linhaDigitavel: '34191.79001 01043.510047 91020.150008 5 88110000099999',
  idCobranca: '123',
};
