import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { CobrancaModule } from '../src/main/consumer-csv.module';

describe('CobrancaController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CobrancaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});
