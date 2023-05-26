import type { Provider } from '@nestjs/common';

import { PrismaService } from '@infra/database/prisma';

import { RegisterUserUseCase } from '../app/use-cases';
import type { IUserRepository } from '../domain/contracts/usuario-repository';
import { UserRepository } from '../infra/repositories';

export const provideRegisterUserUseCase: Provider<RegisterUserUseCase> = {
  provide: RegisterUserUseCase,
  useFactory: (mongo: IUserRepository) => {
    return new RegisterUserUseCase(mongo);
  },
  inject: [UserRepository],
};

export const provideUserRepository: Provider<UserRepository> = {
  provide: UserRepository,
  useFactory: (prismaService: PrismaService) => {
    return new UserRepository(prismaService);
  },
  inject: [PrismaService],
};
