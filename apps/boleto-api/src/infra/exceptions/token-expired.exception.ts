import { BaseException, Status } from '@domain-core/exceptions';

export class TokenExpiredException extends BaseException {
  readonly code = Status.UNAUTHORIZED;
  constructor(metadata?: unknown) {
    super('Token expired', metadata);
  }
}
