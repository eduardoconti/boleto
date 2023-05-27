import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GerarCobrancaUseCase } from '@cobranca/app/use-cases';
import { IGerarCobrancaUseCase } from '@cobranca/domain/use-cases';

import {
  ApiInternalServerErrorResponse,
  ApiSuccessResponse,
} from '@infra/__docs__';
import { JwtAuthGuard } from '@infra/guard';

import { GerarCobrancaInput, GerarCobrancaOutput } from '../dto';

@ApiTags('cobranca')
@Controller('cobranca')
@UseGuards(JwtAuthGuard)
export class GerarCobrancaController {
  constructor(
    @Inject(GerarCobrancaUseCase)
    private readonly geararCobrancaUseCase: IGerarCobrancaUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Gerar um cobranca',
    description: 'Rota para gerar um cobranca',
  })
  @ApiSuccessResponse({
    model: GerarCobrancaOutput,
    statusCode: HttpStatus.CREATED,
  })
  @ApiInternalServerErrorResponse({
    title: 'CobrancaRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  async handle(@Body() data: GerarCobrancaInput): Promise<GerarCobrancaOutput> {
    const { id, linhaDigitavel, valor, dataVencimento, nomeDevedor } =
      await this.geararCobrancaUseCase.execute(
        GerarCobrancaInput.toUseCaseInput(data),
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
