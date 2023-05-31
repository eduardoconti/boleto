/* eslint-disable @typescript-eslint/no-magic-numbers */
import { NestFactory } from '@nestjs/core';

import { CobrancaModule } from './cobranca.module';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(CobrancaModule);
  await app.listen(3001);
}
bootstrap();
