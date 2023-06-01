export interface IConsumer<Data> {
  handle(data: Data): Promise<void>;
}
