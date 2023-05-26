import { AuthModule } from '@auth/main/auth.module';
import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import { UsuarioModule } from '@usuario/main/usuario.module';

@Module({
  imports: [InfraModule, UsuarioModule, AuthModule],
})
export class MainModule {}
