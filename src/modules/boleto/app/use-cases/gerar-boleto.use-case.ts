import type { IBoletoRepository } from '@boleto/domain/contracts/boleto-repository';
import { BoletoEntity } from '@boleto/domain/entities';
import type {
  IGerarBoletoUseCase,
  IGerarBoletoUseCaseInput,
  IGerarBoletoUseCaseOutput,
} from '@boleto/domain/use-cases';

import type { IGerarBoletoComPSP } from '../contracts/IGerarBoletoComPSP';

export class GerarBoletoUseCase implements IGerarBoletoUseCase {
  constructor(
    private readonly boletoRepository: IBoletoRepository,
    private readonly pspService: IGerarBoletoComPSP,
  ) {}
  async execute(
    request: IGerarBoletoUseCaseInput,
  ): Promise<IGerarBoletoUseCaseOutput> {
    const boleto = BoletoEntity.create({ ...request });

    const { linhaDigitavel } = await this.pspService.gerarBoleto({
      dataVencimento: request.dataVencimento,
      idCobranca: request.idCobranca,
      nomeDevedor: request.nomeDevedor,
      valor: request.valor,
    });

    await this.boletoRepository.save(boleto);

    return {
      id: boleto.id.value,
      dataVencimento: boleto.dataVencimento.value,
      email: boleto.email.value,
      idCobranca: boleto.idCobranca,
      nomeDevedor: boleto.nomeDevedor.value,
      pspId: boleto.pspId,
      valor: boleto.valor.value,
      status: boleto.status,
      linhaDigitavel,
    };
  }
}
