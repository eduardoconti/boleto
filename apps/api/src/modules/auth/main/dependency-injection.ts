import { UserAuthUseCase } from '@auth/app/use-cases';
import type { Provider } from '@nestjs/common';

import type { IUserRepository } from '@usuario/domain/contracts/usuario-repository';
import { UserRepository } from '@usuario/infra/repositories';

export const provideUserAuthUseCase: Provider<UserAuthUseCase> = {
  provide: UserAuthUseCase,
  useFactory: (userRepository: IUserRepository) => {
    return new UserAuthUseCase(userRepository);
  },
  inject: [UserRepository],
};
