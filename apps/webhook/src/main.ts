import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

import { rabbitmqDefaultOptions } from '@infra/rabbitmq';

import type { EnvironmentVariables } from '@main/config';

import { ConsumerWebhook } from './consumer-webhook.module';

const DEFAULT_PORT = 3002;
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ConsumerWebhook);
  const configService = app.get(ConfigService<EnvironmentVariables>);

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.getOrThrow<string>('RABBITMQ_URL')}`],
      queue: 'webhook',
      ...rabbitmqDefaultOptions.options,
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('CONSUMER_WEBHOOK_PORT') | DEFAULT_PORT);
}
bootstrap();
