import type {
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput,
} from '@usuario/domain/use-cases';

export const mockRegisterUserUseCaseInput: RegisterUserUseCaseInput = {
  email: 'eduardo.conti@gmail.com',
  nome: 'Eduardo Conti',
  senha: 'teste@123',
};

export const mockRegisterUserUseCaseOutput: RegisterUserUseCaseOutput = {
  email: 'eduardo.conti@gmail.com',
  nome: 'Eduardo Conti',
  id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
};
