import { Module } from '@nestjs/common';

import { GerarCobrancaController } from '@cobranca/presentation/controllers';
import { SalvarCsvCobrancaController } from '@cobranca/presentation/controllers/salvar-csv-cobranca.controller';

import { CobrancaAppModule } from './cobranca-app.module';
import { CobrancaInfraModule } from './cobranca-infra.module';

@Module({
  imports: [CobrancaInfraModule, CobrancaAppModule],
  controllers: [GerarCobrancaController, SalvarCsvCobrancaController],
})
export class CobrancaPresentationModule {}
