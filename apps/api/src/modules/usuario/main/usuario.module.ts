import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import { RegisterUserController } from '../presentation/controllers';
import { provideRegisterUserUseCase } from './dependency-injection';
import { provideUserRepository } from './dependency-injection';

@Module({
  imports: [InfraModule],
  controllers: [RegisterUserController],
  providers: [provideRegisterUserUseCase, provideUserRepository],
  exports: [provideRegisterUserUseCase, provideUserRepository],
})
export class UsuarioModule {}
