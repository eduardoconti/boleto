export interface ReadFileOutput {
  name: string;
  governmentId: string;
  email: string;
  debtAmount: number;
  debtDueDate: string;
  debtId: string;
}

export interface IReadFile<Output> {
  read(path: string): Promise<Output[]>;
}
