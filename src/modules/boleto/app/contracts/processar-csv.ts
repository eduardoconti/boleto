import type { IConsumer } from '@app/contracts';

export interface ProcessarCsvData {
  idCsvCobranca: string;
  caminho: string;
}
export type IProcessarCsv = IConsumer<ProcessarCsvData>;
