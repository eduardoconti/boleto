import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

import { rabbitmqDefaultOptions } from '@infra/rabbitmq';

import type { EnvironmentVariables } from '@main/config';

import { ConsumerProcessarCsv } from './main/consumer-csv.module';

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
}
bootstrap();
