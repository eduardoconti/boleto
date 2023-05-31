import { Module } from '@nestjs/common';

import { InfraModule } from '@infra/infra.module';

import { CobrancaController } from './cobranca.controller';
import { CobrancaService } from './cobranca.service';

@Module({
  imports: [InfraModule],
  controllers: [CobrancaController],
  providers: [CobrancaService],
})
export class CobrancaModule {}
