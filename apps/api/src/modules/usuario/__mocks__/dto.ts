import type { RegisterUserInput } from '@usuario/presentation/dto';

export const mockRegisterUserInput: RegisterUserInput = {
  email: 'eduardo.conti@gmail.com',
  nome: 'Eduardo Conti',
  senha: 'teste@123',
};

export const mockRegisterUserInputRequiredFields: RegisterUserInput = {
  email: 'eduardo.conti@gmail.com',
  nome: 'Eduardo Conti',
  senha: 'teste@123',
};
