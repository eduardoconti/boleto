import { BaseException, Status } from '@domain-core/exceptions';

export class UnauthorizedException extends BaseException {
  readonly code = Status.UNAUTHORIZED;
  constructor(message?: string, metadata?: unknown) {
    super(message ?? 'User not authorized', metadata);
  }
}
