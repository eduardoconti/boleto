import { ApiProperty } from '@nestjs/swagger';

import type { RegisterUserUseCaseOutput } from '../../app/use-cases';

export class RegisterUserOutput {
  @ApiProperty({
    example: 'b85381d7-174f-4c0a-a2c8-aa93a399965d',
  })
  id!: string;

  @ApiProperty({
    example: 'Eduardo Conti',
  })
  nome!: string;

  @ApiProperty({
    example: 'es.eduardoconti@gmail.com',
  })
  email!: string;
  static fromUseCaseOutput({
    nome,
    email,
    id,
  }: RegisterUserUseCaseOutput): RegisterUserOutput {
    return {
      email,
      nome,
      id,
    };
  }
}
