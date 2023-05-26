import type { IBoletoRepository } from '@boleto/domain/contracts/boleto-repository';
import { BoletoEntity } from '@boleto/domain/entities';
import type {
  IGerarBoletoUseCase,
  IGerarBoletoUseCaseInput,
  IGerarBoletoUseCaseOutput,
} from '@boleto/domain/use-cases';

export class GerarBoletoUseCase implements IGerarBoletoUseCase {
  constructor(private readonly boletoRepository: IBoletoRepository) {}
  async execute(
    request: IGerarBoletoUseCaseInput,
  ): Promise<IGerarBoletoUseCaseOutput> {
    const boleto = BoletoEntity.create({ ...request });
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
    };
  }
}
