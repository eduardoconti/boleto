export interface IQueue<T = any> {
  /**
   * The nome of the queue
   */
  nome: string;

  add(data: T): Promise<void>;
}
