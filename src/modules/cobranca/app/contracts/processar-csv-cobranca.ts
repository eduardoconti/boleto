import type { IConsumer } from '@app/contracts';

export interface ProcessarCsvCobrancaData {
  idCsvCobranca: string;
}
export type IProcessarCsvCobranca = IConsumer<ProcessarCsvCobrancaData>;
