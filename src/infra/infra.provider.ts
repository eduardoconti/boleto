import type { Provider } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import type { ILogger } from '@domain-core/contracts';

import { PrismaService } from './database/prisma';
import { SqlManager } from './database/query';
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
  useFactory: (logger: ILogger) => {
    return new MailerService(logger);
  },
  inject: [Logger],
};
