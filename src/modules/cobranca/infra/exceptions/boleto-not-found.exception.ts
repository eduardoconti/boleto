import { BaseException, Status } from '@domain-core/exceptions';

export class BoletoNotFoundException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
