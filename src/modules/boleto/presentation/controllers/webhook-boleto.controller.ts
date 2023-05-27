import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ReceberWebookUseCase } from '@boleto/app/use-cases/receber-webhook.use-case';
import { IReceberWebhookUseCase } from '@boleto/domain/use-cases';

import { ApiInternalServerErrorResponse } from '@infra/__docs__';
import { JwtAuthGuard } from '@infra/guard';

import { WebhookItauInput } from '../dto/webhook-itau-input.dto';

@ApiTags('boleto')
@Controller('boleto')
@UseGuards(JwtAuthGuard)
export class WebhookBoletoController {
  constructor(
    @Inject(ReceberWebookUseCase)
    private readonly receberWebhookUseCase: IReceberWebhookUseCase,
  ) {}

  @Post('/webhook/itau')
  @ApiOperation({
    summary: 'Receber webhook do itau',
    description: 'Rota para receber notificação via webhook',
  })
  @ApiInternalServerErrorResponse({
    title: 'WebhookRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Body() data: WebhookItauInput): Promise<void> {
    await this.receberWebhookUseCase.execute(
      WebhookItauInput.toUseCaseInput(data),
    );
  }
}
