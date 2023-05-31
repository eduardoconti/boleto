import { BaseException, Status } from '@domain-core/exceptions';

export class CobrancaNotFoundException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
