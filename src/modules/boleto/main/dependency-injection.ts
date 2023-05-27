import type { Provider } from '@nestjs/common';

import type { IMailService } from '@app/contracts/mail-service';

import type {
  ICsvCobrancaReader,
  IGerarBoletoComPSP,
  IPublisherWebhook,
} from '@boleto/app/contracts';
import type { IPublisherCsv } from '@boleto/app/contracts/publisher-csv';
import { GerarBoletoCsvConsumer } from '@boleto/app/services/gerar-boleto-csv.consumer';
import { WebhookConsumer } from '@boleto/app/services/webhook.consumer';
import { GerarBoletoUseCase } from '@boleto/app/use-cases';
import { ReceberWebookUseCase } from '@boleto/app/use-cases/receber-webhook.use-case';
import { SalvarCsvCobrancaUseCase } from '@boleto/app/use-cases/salvar-csv-cobranca.use-case';
import type { IWebhookRepository } from '@boleto/domain/contracts';
import type { IBoletoRepository } from '@boleto/domain/contracts/boleto-repository';
import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import type { IGerarBoletoUseCase } from '@boleto/domain/use-cases';
import { GerarBoletoItauService } from '@boleto/infra/psp-services/itau/gerar-boleto-itau.service';
import { WebhookPublisher } from '@boleto/infra/publisher';
import { GerarBoletoCsvPublisher } from '@boleto/infra/publisher/gerar-boleto-csv.publisher';
import { BoletoRepository } from '@boleto/infra/repositories';
import { CsvCobrancaRepository } from '@boleto/infra/repositories/csv-cobranca.repository';
import { WebhookRepository } from '@boleto/infra/repositories/webhook.repository';

import { ReadFileCsv } from '@infra/csv/csv-reader';
import { PrismaService } from '@infra/database/prisma';
import { MailerService } from '@infra/mailer';

export const provideGerarBoletoUseCase: Provider<GerarBoletoUseCase> = {
  provide: GerarBoletoUseCase,
  useFactory: (
    repository: IBoletoRepository,
    pspService: IGerarBoletoComPSP,
  ) => {
    return new GerarBoletoUseCase(repository, pspService);
  },
  inject: [BoletoRepository, GerarBoletoItauService],
};

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

export const provideSalvarCsvCobrancaUseCase: Provider<SalvarCsvCobrancaUseCase> =
  {
    provide: SalvarCsvCobrancaUseCase,
    useFactory: (
      repository: ICsvCobrancaRepository,
      publisher: IPublisherCsv,
    ) => {
      return new SalvarCsvCobrancaUseCase(repository, publisher);
    },
    inject: [CsvCobrancaRepository, GerarBoletoCsvPublisher],
  };

export const provideCsvCobrancaRepository: Provider<CsvCobrancaRepository> = {
  provide: CsvCobrancaRepository,
  useFactory: (prismaService: PrismaService) => {
    return new CsvCobrancaRepository(prismaService);
  },
  inject: [PrismaService],
};

export const provideGerarBoletoCsvConsumer: Provider<GerarBoletoCsvConsumer> = {
  provide: GerarBoletoCsvConsumer,
  useFactory: (
    prismaService: IGerarBoletoUseCase,
    mailService: IMailService,
    csvRepository: ICsvCobrancaRepository,
    csvReader: ICsvCobrancaReader,
  ) => {
    return new GerarBoletoCsvConsumer(
      prismaService,
      mailService,
      csvRepository,
      csvReader,
    );
  },
  inject: [
    GerarBoletoUseCase,
    MailerService,
    CsvCobrancaRepository,
    ReadFileCsv,
  ],
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
  useFactory: (boletoRepository: IBoletoRepository) => {
    return new WebhookConsumer(boletoRepository);
  },
  inject: [BoletoRepository],
};

export const provideReceberWebookUseCase: Provider<ReceberWebookUseCase> = {
  provide: ReceberWebookUseCase,
  useFactory: (
    webhookRepository: IWebhookRepository,
    publisher: IPublisherWebhook,
  ) => {
    return new ReceberWebookUseCase(webhookRepository, publisher);
  },
  inject: [WebhookRepository, WebhookPublisher],
};
