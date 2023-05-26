import type { Provider } from '@nestjs/common';

import { PrismaService } from './database/prisma';
import { SqlManager } from './database/query';

export const provideSqlManager: Provider<SqlManager> = {
  provide: SqlManager,
  useFactory: (prisma: PrismaService) => {
    return new SqlManager(prisma);
  },
  inject: [PrismaService],
};
