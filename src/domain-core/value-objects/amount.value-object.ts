import type { DomainPrimitive } from '@domain-core/contracts';
import { ValueObject } from '@domain-core/contracts';
import { ArgumentInvalidException } from '@domain-core/exceptions';

const BASE = 100;
const DECIMALS = 2;
export class Amount extends ValueObject<number> {
  public constructor(value: number) {
    super({ value });
  }

  public get value(): number {
    return this.props.value;
  }

  static fromBrlString(value: string): number {
    const newValue = parseFloat(value) * BASE;
    return new Amount(
      Number.isInteger(newValue) ? newValue : Math.round(newValue),
    ).value;
  }

  public toBrlString(): string {
    return (this.props.value / BASE).toFixed(DECIMALS);
  }

  protected validate({ value }: DomainPrimitive<number>): void {
    const regexExp = /^\d+$/gi;
    if (!regexExp.test(value.toString())) {
      throw new ArgumentInvalidException('Incorrect amount format');
    }
  }
}
