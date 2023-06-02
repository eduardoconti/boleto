import type { Provider } from '@nestjs/common';

import { GerarCobrancaUseCase } from '@cobranca/app/use-cases';
import type { ICsvCobrancaRepository } from '@cobranca/domain/contracts';
import type { IGerarCobrancaUseCase } from '@cobranca/domain/use-cases';
import { CsvCobrancaRepository } from '@cobranca/infra/repositories';

import { ReadFileCsv } from '@infra/csv/csv-reader';

import type { ICsvCobrancaReader } from '../contracts';
import { GerarCobrancaConsumer } from '../services';

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
