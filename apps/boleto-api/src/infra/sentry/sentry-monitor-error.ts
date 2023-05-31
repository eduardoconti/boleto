import { Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';

import type { IMonitorError } from '@app/contracts';

type Extra = unknown;
type Extras = Record<string, Extra>;
@Injectable()
export class SentryMonitorError implements IMonitorError {
  public constructor(@InjectSentry() private readonly client: SentryService) {}
  capture(exception: Error, metadata?: Extras): void {
    this.client.instance().captureException(exception, { extra: metadata });
  }
}
