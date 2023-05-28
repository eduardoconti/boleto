import { BaseException, Status } from '@domain-core/exceptions';

export class CobrancaRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
