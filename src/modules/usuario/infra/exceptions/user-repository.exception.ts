import { BaseException, Status } from '@domain-core/exceptions';

export class UserRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
