import type { IMailService } from '@app/contracts/mail-service';

import type { IGerarBoletoComPSP } from '@boleto/app/contracts';
import { BoletoEntity } from '@boleto/domain/entities';

import type { ICobrancaRepository } from '@cobranca/domain/contracts';
import { CobrancaEntity } from '@cobranca/domain/entities';
import type {
  IGerarCobrancaUseCase,
  IGerarCobrancaUseCaseInput,
  IGerarCobrancaUseCaseOutput,
} from '@cobranca/domain/use-cases';

export class GerarCobrancaUseCase implements IGerarCobrancaUseCase {
  constructor(
    private readonly cobrancaRepository: ICobrancaRepository,
    private readonly pspService: IGerarBoletoComPSP,
    private readonly mailerService: IMailService,
  ) {}
  async execute(
    request: IGerarCobrancaUseCaseInput,
  ): Promise<IGerarCobrancaUseCaseOutput> {
    const cobranca = CobrancaEntity.create({ ...request });

    const cobrancaSaved = await this.cobrancaRepository.save(cobranca);

    const { linhaDigitavel, pspId } = await this.pspService
      .gerarBoleto({
        dataVencimento: request.dataVencimento,
        idCobranca: cobrancaSaved.id.value.toString(),
        nomeDevedor: request.nomeDevedor,
        valor: request.valor,
      })
      .catch((e) => {
        throw e;
      });

    const boleto = BoletoEntity.create({
      dataVencimento: request.dataVencimento,
      idCobranca: cobrancaSaved.id.value,
      nomeDevedor: request.nomeDevedor,
      pspId: pspId,
      valor: request.valor,
      linhaDigitavel,
    });

    cobrancaSaved.addBoleto(boleto);

    await this.cobrancaRepository.update(cobrancaSaved);

    await this.mailerService
      .send({
        to: request.email,
        from: 'cobranca@automatica.com.br',
        body: `<h1>LinhaDigitavel: ${boleto.linhaDigitavel}</h1>`,
        subject: 'boleto',
        context: 'cobranca csv',
      })
      .catch();

    return {
      id: cobrancaSaved.id.value,
      dataVencimento: cobrancaSaved.dataVencimento.value,
      email: cobrancaSaved.email.value,
      nomeDevedor: cobrancaSaved.nomeDevedor.value,
      valor: cobrancaSaved.valor.value,
      status: cobrancaSaved.status,
      linhaDigitavel,
    };
  }
}
