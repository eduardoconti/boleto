import { BaseException, Status } from '@domain-core/exceptions';

export class UserAlreadyExistsException extends BaseException {
  readonly code = Status.INVALID_REQUEST;
  constructor(readonly metadata?: unknown) {
    super('User already exists', metadata);
  }
}
