import { Inject, Logger } from '@nestjs/common';

import { ILogger } from '@app/contracts/logger';
import type { IMailService, SendMailProps } from '@app/contracts/mail-service';

import { timeoutDelay } from '@infra/utils/timeout';
export class MailerService implements IMailService {
  constructor(
    @Inject(Logger)
    private readonly logger: ILogger,
  ) {}

  async send(data: SendMailProps): Promise<void> {
    const { from, to, body } = data;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    await timeoutDelay(200);
    this.logger.log(
      {
        body: {
          to,
          from,
          body,
        },
      },
      'Mailer service',
    );
  }
}
