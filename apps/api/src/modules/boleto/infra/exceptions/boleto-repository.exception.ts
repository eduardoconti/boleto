import { BaseException, Status } from '@domain-core/exceptions';

export class BoletoRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
