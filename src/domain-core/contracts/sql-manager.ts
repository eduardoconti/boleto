export interface ISqlManager {
  executeQuery<T>(query: string): Promise<T>;
}
