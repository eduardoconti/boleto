import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
  mockRegisterUserInput,
  mockRegisterUserInputRequiredFields,
} from '@usuario/__mocks__/dto';
import { mockRegisterUserUseCaseOutput } from '@usuario/__mocks__/usecases';
import { RegisterUserUseCase } from '@usuario/app/use-cases';
import type { IRegisterUserUseCase } from '@usuario/domain/use-cases';

import { RegisterUserController } from './register-user.controller';

describe('RegisterUserController', () => {
  let controller: RegisterUserController;
  let registerUserUseCase: IRegisterUserUseCase;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterUserController],
      providers: [
        {
          provide: RegisterUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get(RegisterUserController);
    registerUserUseCase = app.get<IRegisterUserUseCase>(RegisterUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(registerUserUseCase).toBeDefined();
  });

  it('should execute controller with all fields', async () => {
    jest
      .spyOn(registerUserUseCase, 'execute')
      .mockResolvedValue(mockRegisterUserUseCaseOutput);
    const result = await controller.handle(mockRegisterUserInput);
    expect(result).toStrictEqual({
      email: 'eduardo.conti@gmail.com',
      id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      nome: 'Eduardo Conti',
    });
    expect(registerUserUseCase.execute).toBeCalled();
  });

  it('should execute controller with required fields', async () => {
    jest
      .spyOn(registerUserUseCase, 'execute')
      .mockResolvedValue(mockRegisterUserUseCaseOutput);
    const result = await controller.handle(mockRegisterUserInputRequiredFields);
    expect(result).toStrictEqual({
      email: 'eduardo.conti@gmail.com',
      id: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
      nome: 'Eduardo Conti',
    });
    expect(registerUserUseCase.execute).toBeCalled();
  });
});
