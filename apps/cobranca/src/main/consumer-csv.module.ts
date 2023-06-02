import { Module } from '@nestjs/common';

import { CobrancaAppModule } from '@cobranca/main/cobranca-app.module';
import { CobrancaInfraModule } from '@cobranca/main/cobranca-infra.module';

import { InfraModule } from '@infra/infra.module';

import { ProcessarCsvCobrancaEventHandler } from '../event-handler';
import { provideGerarCobrancaConsumer } from './dependency-injection';

@Module({
  imports: [InfraModule, CobrancaInfraModule, CobrancaAppModule],
  controllers: [ProcessarCsvCobrancaEventHandler],
  providers: [provideGerarCobrancaConsumer],
})
export class ConsumerCsvModule {}
