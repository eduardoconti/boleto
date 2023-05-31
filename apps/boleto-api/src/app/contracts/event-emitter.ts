import type { DomainEvent } from '@domain-core/contracts';

export interface IEventEmitter {
  emitAsync(key: string, data: DomainEvent): Promise<any>;
  emit(key: string, data: DomainEvent): any;
}
