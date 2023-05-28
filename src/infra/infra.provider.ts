import type { Provider } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import type { ILogger } from '@app/contracts/logger';

import { MailerService } from './mailer';

export const provideMailerService: Provider<MailerService> = {
  provide: MailerService,
  useFactory: (logger: ILogger) => {
    return new MailerService(logger);
  },
  inject: [Logger],
};
