import type { IUserAuthUseCase } from '@auth/app/use-cases';
import { UserAuthUseCase } from '@auth/app/use-cases';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { LocalStrategy } from './local.strategy';

describe('SalvarCsvCobrancaUseCase', () => {
  let localStrategy: LocalStrategy;
  let authService: IUserAuthUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: UserAuthUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    localStrategy = app.get(LocalStrategy);
    authService = app.get(UserAuthUseCase);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('should execute validate successfully', async () => {
    jest
      .spyOn(authService, 'execute')
      .mockResolvedValue({ userId: '', userName: '' });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await localStrategy.validate('a', 'b');
    expect(result).toBeDefined();
  });
});
