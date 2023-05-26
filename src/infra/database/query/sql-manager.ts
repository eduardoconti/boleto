import { Inject } from '@nestjs/common';

import type { ISqlManager } from '@domain-core/contracts';

import { PrismaService } from '../prisma';

export class SqlManager implements ISqlManager {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async executeQuery<T>(query: string): Promise<T> {
    return await this.prisma.$queryRawUnsafe(query);
  }
}
