import { AuthModule } from '@auth/main/auth.module';
import { Module } from '@nestjs/common';

import { BoletoModule } from '@boleto/main/boleto.module';

import { InfraModule } from '@infra/infra.module';

import { UsuarioModule } from '@usuario/main/usuario.module';

@Module({
  imports: [InfraModule, UsuarioModule, AuthModule, BoletoModule],
})
export class MainModule {}
