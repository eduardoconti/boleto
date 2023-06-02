import type { PipeTransform, ArgumentMetadata, Type } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { ValidationError } from 'class-validator';
import { validate } from 'class-validator';

import type { InvalidFields } from '../exceptions';
import { InvalidRequestBodyException } from '../exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length) {
      throw new InvalidRequestBodyException(this.buildInvalidFields(errors));
    }
    return value;
  }

  private toValidate(metatype: Type): boolean {
    const types: Type[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildInvalidFields(
    validationErrors: ValidationError[] = [],
  ): InvalidFields[] {
    let errors: InvalidFields[] = [];
    validationErrors.forEach((validationError: ValidationError): any => {
      const { property, constraints = {} } = validationError;
      if (validationError.children) {
        errors = [
          ...errors,
          ...this.buildInvalidFields(validationError.children),
        ];
      }
      Object.keys(constraints).forEach((prop: any) => {
        const invalidField = {
          field: property,
          reason: constraints[prop],
        };
        errors.push(invalidField);
      });
    });
    return errors;
  }
}
