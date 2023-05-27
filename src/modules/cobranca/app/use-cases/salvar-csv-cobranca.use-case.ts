import type { ICsvCobrancaRepository } from '@cobranca/domain/contracts';
import { ArquivoCobrancaEntity } from '@cobranca/domain/entities/arquivo-cobranca.entity';
import type {
  ISalvarCsvCobrancaUseCase,
  ISalvarCsvCobrancaUseCaseInput,
  ISalvarCsvCobrancaUseCaseOutput,
} from '@cobranca/domain/use-cases';

import type { IPublisherCsvCobranca } from '../contracts';

export class SalvarCsvCobrancaUseCase implements ISalvarCsvCobrancaUseCase {
  constructor(
    private readonly repository: ICsvCobrancaRepository,
    private readonly publisher: IPublisherCsvCobranca,
  ) {}
  async execute(
    request: ISalvarCsvCobrancaUseCaseInput,
  ): Promise<ISalvarCsvCobrancaUseCaseOutput> {
    const csv = ArquivoCobrancaEntity.create({ ...request });
    await this.repository.save(csv);

    await this.publisher.publish({
      idCsvCobranca: csv.id.value,
    });
    return {
      caminho: request.caminho,
      id: csv.id.value,
    };
  }
}
