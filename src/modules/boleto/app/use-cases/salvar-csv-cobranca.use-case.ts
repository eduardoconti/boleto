import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import { CsvCobrancaEntity } from '@boleto/domain/entities';
import type {
  ISalvarCsvCobrancaUseCase,
  ISalvarCsvCobrancaUseCaseInput,
  ISalvarCsvCobrancaUseCaseOutput,
} from '@boleto/domain/use-cases/salvar-csv-cobranca-use-case.interface';

import type { IPublisherCsv } from '../contracts/publisher-csv';

export class SalvarCsvCobrancaUseCase implements ISalvarCsvCobrancaUseCase {
  constructor(
    private readonly repository: ICsvCobrancaRepository,
    private readonly publisher: IPublisherCsv,
  ) {}
  async execute(
    request: ISalvarCsvCobrancaUseCaseInput,
  ): Promise<ISalvarCsvCobrancaUseCaseOutput> {
    const csv = CsvCobrancaEntity.create({ ...request });
    await this.repository.save(csv);

    await this.publisher.publish({
      idCsvCobranca: csv.id.value,
      caminho: request.caminho,
    });
    return {
      caminho: request.caminho,
      id: csv.id.value,
    };
  }
}
