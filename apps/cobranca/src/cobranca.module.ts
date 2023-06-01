import { Module } from '@nestjs/common';

import { CobrancaInfraModule } from '@cobranca/main/cobranca-infra.module';

import { InfraModule } from '@infra/infra.module';

import { ProcessarCsvCobrancaEventHandler } from './event-handler';

@Module({
  imports: [InfraModule, CobrancaInfraModule],
  controllers: [ProcessarCsvCobrancaEventHandler],
})
export class ConsumerProcessarCsv {}
