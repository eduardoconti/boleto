import { LocalStrategy } from '@auth/infra/auth-strategy';
import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import { UsuarioModule } from '@usuario/main/usuario.module';

import { AuthController } from '../presentation/controllers/auth.controller';
import { provideUserAuthUseCase } from './dependency-injection';
@Module({
  imports: [InfraModule, UsuarioModule],
  controllers: [AuthController],
  providers: [LocalStrategy, provideUserAuthUseCase],
})
export class AuthModule {}
