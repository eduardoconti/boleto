import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { CobrancaController } from './cobranca.controller';
import { CobrancaService } from './cobranca.service';

describe('CobrancaController', () => {
  let cobrancaController: CobrancaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CobrancaController],
      providers: [CobrancaService],
    }).compile();

    cobrancaController = app.get<CobrancaController>(CobrancaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cobrancaController.getHello()).toBe('Hello World!');
    });
  });
});
