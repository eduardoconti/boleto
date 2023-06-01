import { Module } from '@nestjs/common';

import { CobrancaAppModule } from './cobranca-app.module';
import { CobrancaInfraModule } from './cobranca-infra.module';
import { CobrancaPresentationModule } from './cobranca-presentation.module';

@Module({
  imports: [CobrancaInfraModule, CobrancaAppModule, CobrancaPresentationModule],
})
export class CobrancaModule {}
