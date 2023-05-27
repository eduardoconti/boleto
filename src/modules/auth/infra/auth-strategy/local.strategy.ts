import type { UserAuthUseCaseOutput } from '@auth/app/use-cases';
import { IUserAuthUseCase, UserAuthUseCase } from '@auth/app/use-cases';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserAuthUseCase)
    private authService: IUserAuthUseCase,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, senha: string): Promise<UserAuthUseCaseOutput> {
    const user = await this.authService.execute({
      userName: email,
      senha,
    });
    return user;
  }
}
