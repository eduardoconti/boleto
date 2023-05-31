import type {
  ArgumentsHost,
  ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common';
import { Logger, Inject } from '@nestjs/common';
import type { Response } from 'express';

import { ILogger } from '@app/contracts/logger';

import type { AplicationProblem } from '../aplication-problem';
import { send } from '../aplication-problem';

export abstract class ExceptionFilter implements NestExceptionFilter {
  constructor(
    @Inject(Logger)
    private readonly logger: ILogger,
  ) {}

  catch(exception: Error, host: ArgumentsHost): void {
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const aplicationProblem = this.createAplicationProblem(exception);

      this.logger.error(
        {
          ...aplicationProblem,
          stack: exception.stack,
        },
        'Controller',
      );

      return send(response, aplicationProblem);
    }
  }
  protected abstract createAplicationProblem(
    exception: unknown,
  ): AplicationProblem;
}
