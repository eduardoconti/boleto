import type { Provider } from '@nestjs/common';

import type { IMailService } from '@app/contracts/mail-service';

import type { IGerarBoletoComPSP } from '@boleto/app/contracts';
import { GerarBoletoItauService } from '@boleto/infra/psp-services/itau/gerar-boleto-itau.service';

import type {
  ICsvCobrancaReader,
  IPublisherCsvCobranca,
} from '@cobranca/app/contracts';
import { GerarCobrancaConsumer } from '@cobranca/app/services/gerar-cobranca.consumer';
import {
  GerarCobrancaUseCase,
  SalvarCsvCobrancaUseCase,
} from '@cobranca/app/use-cases';
import type {
  ICobrancaRepository,
  ICsvCobrancaRepository,
} from '@cobranca/domain/contracts';
import type { IGerarCobrancaUseCase } from '@cobranca/domain/use-cases';
import { GerarCobrancaPublisher } from '@cobranca/infra/publisher';
import {
  CobrancaRepository,
  CsvCobrancaRepository,
} from '@cobranca/infra/repositories';

import { ReadFileCsv } from '@infra/csv/csv-reader';
import { PrismaService } from '@infra/database/prisma';
import { MailerService } from '@infra/mailer';

export const provideCobrancaRepository: Provider<CobrancaRepository> = {
  provide: CobrancaRepository,
  useFactory: (prismaService: PrismaService) => {
    return new CobrancaRepository(prismaService);
  },
  inject: [PrismaService],
};

export const provideGerarCobrancaUseCase: Provider<GerarCobrancaUseCase> = {
  provide: GerarCobrancaUseCase,
  useFactory: (
    repository: ICobrancaRepository,
    geradorBoletoService: IGerarBoletoComPSP,
    mailerService: IMailService,
  ) => {
    return new GerarCobrancaUseCase(
      repository,
      geradorBoletoService,
      mailerService,
    );
  },
  inject: [CobrancaRepository, GerarBoletoItauService, MailerService],
};

export const provideSalvarCsvCobrancaUseCase: Provider<SalvarCsvCobrancaUseCase> =
  {
    provide: SalvarCsvCobrancaUseCase,
    useFactory: (
      csvCobrancaRepository: ICsvCobrancaRepository,
      publisher: IPublisherCsvCobranca,
    ) => {
      return new SalvarCsvCobrancaUseCase(csvCobrancaRepository, publisher);
    },
    inject: [CsvCobrancaRepository, GerarCobrancaPublisher],
  };

export const provideCsvCobrancaRepository: Provider<CsvCobrancaRepository> = {
  provide: CsvCobrancaRepository,
  useFactory: (prismaService: PrismaService) => {
    return new CsvCobrancaRepository(prismaService);
  },
  inject: [PrismaService],
};

export const provideGerarCobrancaConsumer: Provider<GerarCobrancaConsumer> = {
  provide: GerarCobrancaConsumer,
  useFactory: (
    gerarCobrancaUseCase: IGerarCobrancaUseCase,
    csvCobrancaRepository: ICsvCobrancaRepository,
    csvReadr: ICsvCobrancaReader,
  ) => {
    return new GerarCobrancaConsumer(
      gerarCobrancaUseCase,
      csvCobrancaRepository,
      csvReadr,
    );
  },
  inject: [GerarCobrancaUseCase, CsvCobrancaRepository, ReadFileCsv],
};
