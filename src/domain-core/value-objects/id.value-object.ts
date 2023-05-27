import type { DomainPrimitive, UniqueEntityID } from '@domain-core/contracts';
import { ValueObject } from '@domain-core/contracts';

export abstract class ID<
  T extends UniqueEntityID,
> extends ValueObject<UniqueEntityID> {
  constructor(value: T) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    super({ value: value as any });
  }

  public get value(): T {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.props.value as T;
  }

  protected abstract override validate({
    value,
  }: DomainPrimitive<UniqueEntityID>): void;
}
