import { applyDecorators, HttpStatus } from '@nestjs/common';

import type { ApiErrorResponseProps } from './api-error-response.decorator';
import { ApiErrorResponse } from './api-error-response.decorator';

export const ApiUnauthorizedErrorResponse = (
  props: Omit<ApiErrorResponseProps, 'status'>,
) => {
  return applyDecorators(
    ApiErrorResponse({
      status: HttpStatus.UNAUTHORIZED,
      title: props.title,
      detail: props.detail,
    }),
  );
};
