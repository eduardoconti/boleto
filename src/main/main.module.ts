import { AuthModule } from '@auth/main/auth.module';
import { Module } from '@nestjs/common';

import { BoletoModule } from '@boleto/main/boleto.module';

import { CobrancaModule } from '@cobranca/main/cobranca.module';

import { InfraModule } from '@infra/infra.module';

import { UsuarioModule } from '@usuario/main/usuario.module';

@Module({
  imports: [
    InfraModule,
    UsuarioModule,
    AuthModule,
    BoletoModule,
    CobrancaModule,
  ],
})
export class MainModule {}
