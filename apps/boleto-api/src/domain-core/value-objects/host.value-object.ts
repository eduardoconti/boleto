import type { DomainPrimitive } from '@domain-core/contracts';
import { ValueObject } from '@domain-core/contracts';
import { ArgumentInvalidException } from '@domain-core/exceptions';

export class Host extends ValueObject<string> {
  public constructor(nome: string) {
    super({ value: nome });
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    try {
      const host = new URL(value).hostname;
      if (!host) throw new ArgumentInvalidException('invalid url');
    } catch (error) {
      throw new ArgumentInvalidException('invalid url', error);
    }
  }
}
