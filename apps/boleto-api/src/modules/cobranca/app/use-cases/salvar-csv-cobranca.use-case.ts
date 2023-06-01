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
  async execute({
    caminho,
  }: ISalvarCsvCobrancaUseCaseInput): Promise<ISalvarCsvCobrancaUseCaseOutput> {
    const csv = ArquivoCobrancaEntity.create({ caminho });
    await this.repository.save(csv);

    await this.publisher.publish({
      idCsvCobranca: csv.id.value,
    });
    return {
      caminho,
      id: csv.id.value,
    };
  }
}
