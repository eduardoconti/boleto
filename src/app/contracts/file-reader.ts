export interface IReadFile<Output> {
  read(path: string): Promise<Output[]>;
}
