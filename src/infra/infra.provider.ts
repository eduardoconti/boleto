import type { Provider } from '@nestjs/common';

import { PrismaService } from './database/prisma';
import { SqlManager } from './database/query';
import type { IHttpService } from './http-service';
import { HttpService } from './http-service';
import { MailerService } from './mailer';

export const provideSqlManager: Provider<SqlManager> = {
  provide: SqlManager,
  useFactory: (prisma: PrismaService) => {
    return new SqlManager(prisma);
  },
  inject: [PrismaService],
};

export const provideMailerService: Provider<MailerService> = {
  provide: MailerService,
  useFactory: (httpService: IHttpService) => {
    return new MailerService(httpService);
  },
  inject: [HttpService],
};
