import type { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ClientProxy } from '@nestjs/microservices';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import type { IPublisherWebhook } from '@boleto/app/contracts';
import { WebhookConsumer } from '@boleto/app/services/webhook.consumer';
import { ReceberWebhookUseCase } from '@boleto/app/use-cases/receber-webhook.use-case';
import type { IWebhookRepository } from '@boleto/domain/contracts';
import { GerarBoletoItauService } from '@boleto/infra/psp-services/itau/gerar-boleto-itau.service';
import { WebhookPublisher } from '@boleto/infra/publisher';
import { BoletoRepository } from '@boleto/infra/repositories';
import { WebhookRepository } from '@boleto/infra/repositories/webhook.repository';

import type { ICobrancaRepository } from '@cobranca/domain/contracts';
import { CobrancaRepository } from '@cobranca/infra/repositories';

import { PrismaService } from '@infra/database/prisma';
import { rabbitmqDefaultOptions } from '@infra/rabbitmq';

import type { EnvironmentVariables } from '@main/config';

export const provideBoletoRepository: Provider<BoletoRepository> = {
  provide: BoletoRepository,
  useFactory: (prismaService: PrismaService) => {
    return new BoletoRepository(prismaService);
  },
  inject: [PrismaService],
};

export const provideGerarBoletoItauService: Provider<GerarBoletoItauService> = {
  provide: GerarBoletoItauService,
  useFactory: () => {
    return new GerarBoletoItauService();
  },
};

export const provideWebhookRepository: Provider<WebhookRepository> = {
  provide: WebhookRepository,
  useFactory: (prismaService: PrismaService) => {
    return new WebhookRepository(prismaService);
  },
  inject: [PrismaService],
};

export const provideWebhookConsumer: Provider<WebhookConsumer> = {
  provide: WebhookConsumer,
  useFactory: (cobrancaRepository: ICobrancaRepository) => {
    return new WebhookConsumer(cobrancaRepository);
  },
  inject: [CobrancaRepository],
};

export const provideReceberWebhookUseCase: Provider<ReceberWebhookUseCase> = {
  provide: ReceberWebhookUseCase,
  useFactory: (
    webhookRepository: IWebhookRepository,
    publisher: IPublisherWebhook,
  ) => {
    return new ReceberWebhookUseCase(webhookRepository, publisher);
  },
  inject: [WebhookRepository, WebhookPublisher],
};

export const provideWebhookClientProxy: Provider<ClientProxy> = {
  provide: 'publisher_webhook',
  useFactory: (
    configService: ConfigService<EnvironmentVariables>,
  ): ClientProxy => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [configService.getOrThrow('RABBITMQ_URL')],
        queue: 'webhook',
        ...rabbitmqDefaultOptions.options,
      },
    });
  },
  inject: [ConfigService],
};
