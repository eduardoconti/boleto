/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  InvalidTokenException,
  TokenExpiredException,
  UnauthorizedException,
} from '@infra/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<D>(err: any, user: D, info: any) {
    if (info) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { nome } = info;
      switch (nome) {
        case 'JsonWebTokenError':
          throw new InvalidTokenException();
        case 'TokenExpiredError':
          throw new TokenExpiredException();
        case 'NotBeforeError':
          throw new UnauthorizedException();
      }
    }

    if (!user || err) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
