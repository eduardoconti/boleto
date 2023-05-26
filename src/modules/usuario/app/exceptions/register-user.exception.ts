import { BaseException, Status } from '@domain-core/exceptions';

export class RegisterUserException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
