import { Catch } from '@nestjs/common';

import { BaseException } from '@domain-core/exceptions';

import { AplicationProblem } from '../aplication-problem';
import { ExceptionFilter } from './exception-filter';

@Catch(BaseException)
export class BaseExceptionFilter extends ExceptionFilter {
  protected createAplicationProblem(
    exception: BaseException,
  ): AplicationProblem {
    return AplicationProblem.createFromBaseException(exception);
  }
}
