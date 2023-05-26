import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import { CsvCobrancaEntity } from '@boleto/domain/entities';
import type {
  ISalvarCsvCobrancaUseCase,
  ISalvarCsvCobrancaUseCaseInput,
  ISalvarCsvCobrancaUseCaseOutput,
} from '@boleto/domain/use-cases/salvar-csv-cobranca-use-case.interface';

export class SalvarCsvCobrancaUseCase implements ISalvarCsvCobrancaUseCase {
  constructor(private readonly repository: ICsvCobrancaRepository) {}
  async execute(
    request: ISalvarCsvCobrancaUseCaseInput,
  ): Promise<ISalvarCsvCobrancaUseCaseOutput> {
    const csv = CsvCobrancaEntity.create({ ...request });
    await this.repository.save(csv);
    return {
      caminho: request.caminho,
      id: csv.id.value,
    };
  }
}
