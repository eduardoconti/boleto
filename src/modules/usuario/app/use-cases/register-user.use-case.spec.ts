import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { mockRegisterUserUseCaseInput } from '@usuario/__mocks__/usecaste';
import { mockUserEntity } from '@usuario/domain/__mocks__';
import type { IUserRepository } from '@usuario/domain/contracts/usuario-repository';
import type { IRegisterUserUseCase } from '@usuario/domain/use-cases';
import { UserRepository } from '@usuario/infra/repositories';
import { provideRegisterUserUseCase } from '@usuario/main/dependency-injection';

import { UserAlreadyExistsException } from '../exceptions';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: IRegisterUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideRegisterUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            exists: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    registerUserUseCase = app.get<IRegisterUserUseCase>(RegisterUserUseCase);
    userRepository = app.get<IUserRepository>(UserRepository);
  });

  it('should defined', () => {
    expect(registerUserUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should register new user successfully', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue(false);
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUserEntity);
    const result = await registerUserUseCase.execute(
      mockRegisterUserUseCaseInput,
    );
    expect(result).toBeDefined();
  });
  it('should throw UserAlreadyExistsException', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue(true);
    await expect(
      registerUserUseCase.execute(mockRegisterUserUseCaseInput),
    ).rejects.toThrowError(UserAlreadyExistsException);
    expect(userRepository.exists).toBeCalled();
    expect(userRepository.save).not.toBeCalled();
  });
});
