import { Module } from '@nestjs/common';

import { BoletoInfraModule } from './boleto-infra.module';
import { provideReceberWebhookUseCase } from './dependency-injection';

@Module({
  imports: [BoletoInfraModule],
  providers: [provideReceberWebhookUseCase],
  exports: [provideReceberWebhookUseCase],
})
export class BoletoAppModule {}
