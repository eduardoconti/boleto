import type { IMailService, SendMailProps } from '@app/contracts/mail-service';

import type { ILogger } from '@domain-core/contracts';

import { timeoutDelay } from '@infra/utils/timeout';

const delay = 200;
export class MailerService implements IMailService {
  constructor(private readonly logger: ILogger) {}

  async send(data: SendMailProps): Promise<void> {
    const { from, to, body } = data;

    await timeoutDelay(delay);
    this.logger.log(
      `sending email ${data.context}: ${JSON.stringify({
        to,
        from,
        body,
      })}`,
    );
  }
}
