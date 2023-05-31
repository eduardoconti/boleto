import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

import { rabbitmqDefaultOptions } from '@infra/rabbitmq';

import type { EnvironmentVariables } from '@main/config';

import { ConsumerProcessarCsv } from './cobranca.module';
const DEFAULT_PORT = 3001;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ConsumerProcessarCsv);
  const configService = app.get(ConfigService<EnvironmentVariables>);
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.getOrThrow<string>('RABBITMQ_URL')}`],
      queue: 'csv_cobranca',
      ...rabbitmqDefaultOptions.options,
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('CONSUMER_WEBHOOK_PORT') | DEFAULT_PORT);
}
bootstrap();
