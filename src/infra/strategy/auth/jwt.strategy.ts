import { Injectable } from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { TokenPayload } from '@app/contracts';

import type { EnvironmentVariables } from '@main/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (_request: any, _token: any, done: any) => {
        const secret = this.configService.getOrThrow<string>('JWT_KEY');
        done(null, secret);
      },
    });
  }

  validate({ userId, userName }: TokenPayload): TokenPayload {
    return {
      userName,
      userId,
    };
  }
}
