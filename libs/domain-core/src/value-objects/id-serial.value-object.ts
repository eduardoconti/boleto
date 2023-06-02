import type { DomainPrimitive } from '@domain-core/contracts';
import { ArgumentInvalidException } from '@domain-core/exceptions';

import { ID } from './id.value-object';

const menor_id_permitido = 1;
export class SerialID extends ID<number> {
  protected validate({ value }: DomainPrimitive<number>): void {
    if (value < menor_id_permitido) {
      throw new ArgumentInvalidException('Incorrect ID serial format');
    }
  }
}
