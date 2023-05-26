import type { Provider } from '@nestjs/common';

import type { IGerarBoletoComPSP } from '@boleto/app/contracts/IGerarBoletoComPSP';
import { GerarBoletoUseCase } from '@boleto/app/use-cases';
import { SalvarCsvCobrancaUseCase } from '@boleto/app/use-cases/salvar-csv-cobranca.use-case';
import type { IBoletoRepository } from '@boleto/domain/contracts/boleto-repository';
import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import { GerarBoletoItauService } from '@boleto/infra/psp-services/itau/gerar-boleto-itau.service';
import { BoletoRepository } from '@boleto/infra/repositories';
import { CsvCobrancaRepository } from '@boleto/infra/repositories/csv-cobranca.repository';

import { PrismaService } from '@infra/database/prisma';

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
    useFactory: (repository: ICsvCobrancaRepository) => {
      return new SalvarCsvCobrancaUseCase(repository);
    },
    inject: [CsvCobrancaRepository],
  };

export const provideCsvCobrancaRepository: Provider<CsvCobrancaRepository> = {
  provide: CsvCobrancaRepository,
  useFactory: (prismaService: PrismaService) => {
    return new CsvCobrancaRepository(prismaService);
  },
  inject: [PrismaService],
};
