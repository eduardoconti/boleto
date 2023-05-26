import type { IMailService } from '@app/contracts/mail-service';

import type { ICsvCobrancaRepository } from '@boleto/domain/contracts/csv-cobranca.repository';
import type { IGerarBoletoUseCase } from '@boleto/domain/use-cases';

import { Amount, UUID } from '@domain-core/value-objects';

import type { ICsvCobrancaReader } from '../contracts';
import type {
  IProcessarCsv,
  ProcessarCsvData,
} from '../contracts/processar-csv';

export class GerarBoletoCsvConsumer implements IProcessarCsv {
  constructor(
    private readonly gerarBoletoUseCase: IGerarBoletoUseCase,
    private readonly mailerService: IMailService,
    private readonly csvRepository: ICsvCobrancaRepository,
    private readonly csvReader: ICsvCobrancaReader,
  ) {}
  async handle({ idCsvCobranca }: ProcessarCsvData): Promise<void> {
    const csvCobranca = await this.csvRepository.findOne({
      id: new UUID(idCsvCobranca),
    });
    if (csvCobranca.estaProcessado()) return;

    const linhasCsv = await this.csvReader.read(csvCobranca.caminho);
    await Promise.all(
      linhasCsv.map(async (e) => {
        const boleto = await this.gerarBoletoUseCase.execute({
          dataVencimento: e.debtDueDate,
          email: e.email,
          idCobranca: e.debtId,
          nomeDevedor: e.name,
          pspId: e.governmentId,
          valor: Amount.fromBrlString(e.debtAmount),
        });
        await this.mailerService.send({
          to: e.email,
          from: 'cobranca@automatica.com.br',
          body: `<h1>LinhaDigitavel: ${boleto.linhaDigitavel}</h1>`,
          subject: 'boleto',
          context: 'cobranca csv',
        });
      }),
    );

    csvCobranca.marcarComoProcessado();
    await this.csvRepository.update(csvCobranca);
  }
}
