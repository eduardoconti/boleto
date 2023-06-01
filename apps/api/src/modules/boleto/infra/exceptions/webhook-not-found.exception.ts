import { BaseException, Status } from '@domain-core/exceptions';

export class WebhookNotFoundException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
