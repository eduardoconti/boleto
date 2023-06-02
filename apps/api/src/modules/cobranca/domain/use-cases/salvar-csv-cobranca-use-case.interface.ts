import type { IUseCase } from '@domain-core/contracts';

export type ISalvarCsvCobrancaUseCaseOutput = ISalvarCsvCobrancaUseCaseInput & {
  id: string;
};

export interface ISalvarCsvCobrancaUseCaseInput {
  caminho: string;
}

export type ISalvarCsvCobrancaUseCase = IUseCase<
  ISalvarCsvCobrancaUseCaseInput,
  ISalvarCsvCobrancaUseCaseOutput
>;
