import type {
  GerarBoletoRequest,
  GerarBoletoResponse,
  IGerarBoletoComPSP,
} from '@boleto/app/contracts';
import { FalhaAoCriarBoletoComItau } from '@boleto/infra/exceptions/failed-to-create-boleto-on-itau.exception';

import { timeoutDelay } from '@infra/utils/timeout';
const fakeDelay = 200;
export class GerarBoletoItauService implements IGerarBoletoComPSP {
  async gerarBoleto(request: GerarBoletoRequest): Promise<GerarBoletoResponse> {
    try {
      await timeoutDelay(fakeDelay);
      const min = 1000;
      const max = 100000;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return {
        dataVencimento: new Date(),
        idCobranca: request.idCobranca,
        linhaDigitavel:
          '34191.79001 01043.510047 91020.150008 5 88110000099999',
        nomeDevedor: request.nomeDevedor,
        valor: request.valor,
        pspId: randomNumber.toString(),
      };
    } catch (error) {
      throw new FalhaAoCriarBoletoComItau('Itau indisponivel');
    }
  }
}
