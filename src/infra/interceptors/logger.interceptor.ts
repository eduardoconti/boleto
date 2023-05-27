import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { Request } from 'express';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ILogger } from '@app/contracts/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(Logger)
    private readonly logger: ILogger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap((output) => {
        try {
          this.logger.log(
            {
              path: req.path,
              headers: req.headers,
              input: req.body,
              output,
              requestTime: `${Date.now() - now}ms`,
            },
            'CONTROLLER',
          );
        } catch (error) {
          this.logger.error('failed to log Controller', 'CONTROLLER');
        }
      }),
    );
  }
}
