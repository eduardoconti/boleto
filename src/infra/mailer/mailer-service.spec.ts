import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import type { IMailService } from '@app/contracts/mail-service';

import type { IHttpService } from '@infra/http-service';
import { HttpService } from '@infra/http-service';
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
  let httpService: IHttpService;
  let mailerService: IMailService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        provideMailerService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    httpService = app.get<IHttpService>(HttpService);
    mailerService = app.get<IMailService>(MailerService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be send mail', async () => {
    jest.spyOn(httpService, 'post').mockResolvedValue(undefined);
    await mailerService.send(makeFakeBody);
    expect(httpService.post).toBeCalled();
  });
});
