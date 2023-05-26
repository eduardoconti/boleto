import type { Provider } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { ISqlManager } from '@domain-core/contracts';

import { provideSqlManager } from '@infra/infra.provider';

import { PrismaService } from '../prisma';
import { SqlManager } from './sql-manager';

const providePrisma = (): Provider => ({
  provide: PrismaService,
  useValue: new PrismaService(),
});
const fakeSqlResponse = [
  { teamId: 'b80c972f-3933-4178-8622-2a35ae28f94d', teamName: 'fake' },
];
describe('SqlManager', () => {
  let prisma: PrismaService;
  let sqlManager: ISqlManager;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [providePrisma(), provideSqlManager],
    }).compile();
    prisma = app.get<PrismaService>(PrismaService);
    sqlManager = app.get<ISqlManager>(SqlManager);
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
    expect(sqlManager).toBeDefined();
  });

  it('should be executeQuery successfully', async () => {
    jest.spyOn(prisma, '$queryRawUnsafe').mockResolvedValue(fakeSqlResponse);
    const result = await sqlManager.executeQuery('select * from team');
    expect(result).toBeDefined();
    expect(result).toEqual(fakeSqlResponse);
  });
});
