import type { IReadFile } from '@app/contracts/file-reader';

export interface ICsvCobrancaLinha {
  name: string;
  governmentId: string;
  email: string;
  debtAmount: string;
  debtDueDate: Date;
  debtId: string;
}

export type ICsvCobrancaReader = IReadFile<ICsvCobrancaLinha>;
