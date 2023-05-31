import { BaseException, Status } from '@domain-core/exceptions';

export class UserNotFoundException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
