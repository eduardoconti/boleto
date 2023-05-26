import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { IUserAuthUseCase, UserAuthUseCase } from '../../app/use-cases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserAuthUseCase)
    private authService: IUserAuthUseCase,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, senha: string): Promise<any> {
    const user = await this.authService.execute({
      userName: email,
      senha,
    });
    return user;
  }
}
