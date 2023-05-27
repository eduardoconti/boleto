import type { Provider } from '@nestjs/common';

import type { IHttpService } from './http-service';
import { HttpService } from './http-service';
import { MailerService } from './mailer';

export const provideMailerService: Provider<MailerService> = {
  provide: MailerService,
  useFactory: (httpService: IHttpService) => {
    return new MailerService(httpService);
  },
  inject: [HttpService],
};
