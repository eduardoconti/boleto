import type {
  ArgumentsHost,
  ExceptionFilter as NestExceptionFilter,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

import type { AplicationProblem } from '../aplication-problem';
import { send } from '../aplication-problem';

export abstract class ExceptionFilter implements NestExceptionFilter {
  constructor(private readonly logger: Logger) {}

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
        'CONTROLLER',
      );

      return send(response, aplicationProblem);
    }
  }
  protected abstract createAplicationProblem(
    exception: unknown,
  ): AplicationProblem;
}
