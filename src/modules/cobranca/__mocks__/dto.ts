import type {
  IGerarCobrancaUseCaseInput,
  IGerarCobrancaUseCaseOutput,
} from '@cobranca/domain/use-cases';
import type { GerarCobrancaInput } from '@cobranca/presentation/dto';

export const mockGerarCobrancaUseCaseInput: IGerarCobrancaUseCaseInput = {
  nomeDevedor: 'Eduardo Conti',
  email: 'es.eduardoconti@gmail.com',
  valor: 9000,
  dataVencimento: new Date('2023-05-26T20:46:02.264Z'),
};

export const mockGerarCobrancaUseCaseOutput: IGerarCobrancaUseCaseOutput = {
  nomeDevedor: 'Eduardo Conti',
  email: 'es.eduardoconti@gmail.com',
  valor: 9000,
  dataVencimento: new Date('2023-05-26T20:46:02.264Z'),
  id: 1,
  status: 'EM_ABERTO',
  linhaDigitavel: '34191.79001 01043.510047 91020.150008 5 88110000099999',
};

export const mockGerarCobrancaInput: GerarCobrancaInput = {
  nome_devedor: 'Eduardo Conti',
  email: 'es.eduardoconti@gmail.com',
  valor: 9000,
  data_vencimento: new Date('2023-05-27T01:54:46.698Z'),
};
