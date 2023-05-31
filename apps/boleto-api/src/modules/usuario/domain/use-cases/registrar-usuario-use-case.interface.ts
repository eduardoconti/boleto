import type { IUseCase } from '@domain-core/contracts';

export type RegisterUserUseCaseOutput = Omit<
  RegisterUserUseCaseInput,
  'senha'
> & { id: string };
export interface RegisterUserUseCaseInput {
  nome: string;
  email: string;
  senha: string;
}

export type IRegisterUserUseCase = IUseCase<
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput
>;
