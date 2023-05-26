type Index = 'charge';
export interface ExternalLogs<T> {
  dataInclusao: Date;
  service: string;
  event: T;
}

export interface SendExternalLogsProps<T> {
  index: Index;
  body: ExternalLogs<T>;
}
export interface IExternalLog {
  send<T>(props: SendExternalLogsProps<T>): Promise<void>;
}
