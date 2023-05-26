import { Logger } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { IMailService } from '@app/contracts/mail-service';

import type { ILogger } from '@domain-core/contracts';

import { provideMailerService } from '@infra/infra.provider';

import { MailerService } from './mailer-service';

const makeFakeBody = {
  body: '<h1>fakebody</h1>',
  context: 'fakeContext',
  from: 'fakeFrom@gmail.com',
  subject: '',
  to: 'fakeTo@gmail.com',
};
describe('MailerService', () => {
  let logger: ILogger;
  let mailerService: IMailService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideMailerService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    logger = app.get<ILogger>(Logger);
    mailerService = app.get<IMailService>(MailerService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be send mail', async () => {
    jest.spyOn(logger, 'log').mockImplementation(() => null);
    await mailerService.send(makeFakeBody);
    expect(logger.log).toBeCalled();
  });
});
