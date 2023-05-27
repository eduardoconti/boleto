import type { IUseCase } from '@domain-core/contracts';

import type { StatusCobranca } from '../entities';

export type IGerarCobrancaUseCaseOutput = IGerarCobrancaUseCaseInput & {
  id: number;
  status: StatusCobranca;
  linhaDigitavel: string;
};

export interface IGerarCobrancaUseCaseInput {
  valor: number;
  dataVencimento: Date;
  email: string;
  nomeDevedor: string;
}

export type IGerarCobrancaUseCase = IUseCase<
  IGerarCobrancaUseCaseInput,
  IGerarCobrancaUseCaseOutput
>;
