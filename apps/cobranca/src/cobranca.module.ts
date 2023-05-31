import { Module } from '@nestjs/common';

import { CobrancaModule } from '@cobranca/main/cobranca.module';

import { InfraModule } from '@infra/infra.module';

import { ProcessarCsvCobrancaEventHandler } from './event-handler';

@Module({
  imports: [InfraModule, CobrancaModule],
  controllers: [ProcessarCsvCobrancaEventHandler],
})
export class ConsumerProcessarCsv {}
