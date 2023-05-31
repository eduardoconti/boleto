import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  ApiInternalServerErrorResponse,
  ApiSuccessResponse,
} from '@infra/__docs__';

import { RegisterUserUseCase } from '@usuario/app/use-cases';
import { IRegisterUserUseCase } from '@usuario/domain/use-cases';

import { RegisterUserInput } from '../dto';
import { RegisterUserOutput } from '../dto/register-user.output.dto';

@ApiTags('user')
@Controller('user')
export class RegisterUserController {
  constructor(
    @Inject(RegisterUserUseCase)
    private readonly registerUserUseCase: IRegisterUserUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Registra novo usuário',
    description: 'Rota para registrar um novo usuário',
  })
  @ApiSuccessResponse({
    model: RegisterUserOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiInternalServerErrorResponse({
    title: 'UserRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  async handle(@Body() data: RegisterUserInput): Promise<RegisterUserOutput> {
    const { email, nome, id } = await this.registerUserUseCase.execute(
      RegisterUserInput.toUseCaseInput(data),
    );
    return { id, email, nome };
  }
}
