import { Module } from '@nestjs/common';

import { BoletoAppModule } from './boleto-app.module';
import { BoletoInfraModule } from './boleto-infra.module';
import { BoletoPresentationModule } from './boleto-presentation.module';

@Module({
  imports: [BoletoPresentationModule, BoletoInfraModule, BoletoAppModule],
})
export class BoletoModule {}
