import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty({
    example: 'es.eduardoconti@gmail.com',
  })
  @IsString()
  email!: string;

  @ApiProperty({
    example: 'teste@123',
  })
  @IsString()
  senha!: string;
}
