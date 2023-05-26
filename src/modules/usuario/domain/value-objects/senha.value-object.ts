import * as bcrypt from 'bcrypt';

import type { DomainPrimitive } from '@domain-core/contracts';
import { ValueObject } from '@domain-core/contracts';
import { ArgumentInvalidException } from '@domain-core/exceptions';

export class Senha extends ValueObject<string> {
  public constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  static async hash(senha: string): Promise<Senha> {
    const salt = 10;
    const bcryptHash = await bcrypt.hash(senha, salt);
    return new Senha(bcryptHash);
  }

  static async compareHash(senha: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(senha, hash);
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!value) {
      throw new ArgumentInvalidException('senha must be not empty');
    }
  }
}
