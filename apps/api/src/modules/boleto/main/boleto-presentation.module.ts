import { Module } from '@nestjs/common';

import { WebhookBoletoController } from '@boleto/presentation/controllers';

import { BoletoAppModule } from './boleto-app.module';
import { BoletoInfraModule } from './boleto-infra.module';

@Module({
  imports: [BoletoInfraModule, BoletoAppModule],
  controllers: [WebhookBoletoController],
})
export class BoletoPresentationModule {}
