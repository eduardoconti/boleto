import type { IMailService, SendMailProps } from '@app/contracts/mail-service';

import type { IHttpService } from '@infra/http-service';
export class MailerService implements IMailService {
  constructor(private readonly httpService: IHttpService) {}

  async send(data: SendMailProps): Promise<void> {
    const { from, to, body } = data;

    await this.httpService.post({
      url: 'https://webhook.site/cd675667-172f-410c-914f-f563f7a61197',
      body: {
        to,
        from,
        body,
      },
    });
  }
}
