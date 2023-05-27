import type { ICsvCobrancaRepository } from '@cobranca/domain/contracts';
import type { IGerarCobrancaUseCase } from '@cobranca/domain/use-cases';

import { Amount, UUID } from '@domain-core/value-objects';

import type {
  ICsvCobrancaReader,
  IProcessarCsvCobranca,
  ProcessarCsvCobrancaData,
} from '../contracts';

export class GerarCobrancaConsumer implements IProcessarCsvCobranca {
  constructor(
    private readonly gerarCobrancaUseCase: IGerarCobrancaUseCase,
    private readonly csvRepository: ICsvCobrancaRepository,
    private readonly csvReader: ICsvCobrancaReader,
  ) {}
  async handle({ idCsvCobranca }: ProcessarCsvCobrancaData): Promise<void> {
    const csvCobranca = await this.csvRepository.findOne({
      id: new UUID(idCsvCobranca),
    });
    if (csvCobranca.estaProcessado()) return;

    const linhasCsv = await this.csvReader.read(csvCobranca.caminho);
    await Promise.all(
      linhasCsv.map(async (e) => {
        await this.gerarCobrancaUseCase.execute({
          dataVencimento: e.debtDueDate,
          email: e.email,
          nomeDevedor: e.name,
          valor: Amount.fromBrlString(e.debtAmount),
        });
      }),
    );

    csvCobranca.marcarComoProcessado();
    await this.csvRepository.update(csvCobranca);
  }
}
