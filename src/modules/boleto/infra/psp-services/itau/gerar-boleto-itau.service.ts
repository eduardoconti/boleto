import type {
  GerarBoletoRequest,
  GerarBoletoResponse,
  IGerarBoletoComPSP,
} from '@boleto/app/contracts/IGerarBoletoComPSP';
import { FalhaAoCriarBoletoComItau } from '@boleto/infra/exceptions/failed-to-create-boleto-on-itau.exception';

import { timeoutDelay } from '@infra/utils/timeout';
const fakeDelay = 200;
export class GerarBoletoItauService implements IGerarBoletoComPSP {
  async gerarBoleto(request: GerarBoletoRequest): Promise<GerarBoletoResponse> {
    try {
      await timeoutDelay(fakeDelay);
      return {
        dataVencimento: new Date(),
        idCobranca: request.idCobranca,
        linhaDigitavel:
          '34191.79001 01043.510047 91020.150008 5 88110000099999',
        nomeDevedor: request.nomeDevedor,
        valor: request.valor,
      };
    } catch (error) {
      throw new FalhaAoCriarBoletoComItau('Itau indisponivel');
    }
  }
}
