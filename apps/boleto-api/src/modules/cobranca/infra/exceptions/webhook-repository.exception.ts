import { BaseException, Status } from '@domain-core/exceptions';

export class WebhookRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
