import type { IUseCase } from '@domain-core/contracts';

import type { StatusBoleto } from '../entities';

export type IGerarBoletoUseCaseOutput = IGerarBoletoUseCaseInput & {
  id: string;
  status: StatusBoleto;
  linhaDigitavel: string;
};

export interface IGerarBoletoUseCaseInput {
  idCobranca: string;
  email: string;
  pspId: string;
  valor: number;
  dataVencimento: Date;
  nomeDevedor: string;
}

export type IGerarBoletoUseCase = IUseCase<
  IGerarBoletoUseCaseInput,
  IGerarBoletoUseCaseOutput
>;
