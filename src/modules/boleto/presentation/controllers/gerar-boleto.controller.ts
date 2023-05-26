import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GerarBoletoUseCase } from '@boleto/app/use-cases';
import { IGerarBoletoUseCase } from '@boleto/domain/use-cases';

import {
  ApiInternalServerErrorResponse,
  ApiSuccessResponse,
} from '@infra/__docs__';
import { JwtAuthGuard } from '@infra/guard';

import { GerarBoletoInput } from '../dto/gerar-boleto-input.dto';
import { GerarBoletoOutput } from '../dto/gerar-boleto-output.dto';

@ApiTags('boleto')
@Controller('boleto')
@UseGuards(JwtAuthGuard)
export class GerarBoletoController {
  constructor(
    @Inject(GerarBoletoUseCase)
    private readonly registerUserUseCase: IGerarBoletoUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Registra novo usuário',
    description: 'Rota para registrar um novo usuário',
  })
  @ApiSuccessResponse({
    model: GerarBoletoOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiInternalServerErrorResponse({
    title: 'UserRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  async handle(@Body() data: GerarBoletoInput): Promise<GerarBoletoOutput> {
    const { id, linhaDigitavel, valor, dataVencimento, nomeDevedor } =
      await this.registerUserUseCase.execute(
        GerarBoletoInput.toUseCaseInput(data),
      );
    return {
      id,
      nome_devedor: nomeDevedor,
      data_vencimento: dataVencimento,
      valor,
      linha_digitavel: linhaDigitavel,
    };
  }
}
