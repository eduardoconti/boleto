export interface GerarBoletoRequest {
  valor: number;
  dataVencimento: Date;
  nomeDevedor: string;
  idCobranca: string;
}

export interface GerarBoletoResponse {
  valor: number;
  dataVencimento: Date;
  nomeDevedor: string;
  idCobranca: string;
  linhaDigitavel: string;
}

export interface IGerarBoletoComPSP {
  gerarBoleto(request: GerarBoletoRequest): Promise<GerarBoletoResponse>;
}
