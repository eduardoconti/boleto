import type { Type } from '@nestjs/common';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

interface Props<TModel> {
  model: TModel;
  statusCode?: HttpStatus;
  isArray?: boolean;
}
export const ApiSuccessResponse = <TModel extends Type>(
  props: Props<TModel>,
) => {
  return applyDecorators(
    ApiResponse({
      type: props.model,
      status: props.statusCode ?? HttpStatus.OK,
      isArray: props.isArray,
    }),
  );
};
