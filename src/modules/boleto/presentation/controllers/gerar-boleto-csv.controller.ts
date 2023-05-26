import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiInternalServerErrorResponse } from '@infra/__docs__';
import { JwtAuthGuard } from '@infra/guard';
import { timeoutDelay } from '@infra/utils/timeout';

@ApiTags('boleto')
@Controller('boleto')
@UseGuards(JwtAuthGuard)
export class GerarBoletoCSVController {
  @Post('/csv')
  @ApiOperation({
    summary: 'Gerar boletos a partir de um csv',
    description: 'Rota para gerar boletos a partir do csv',
  })
  @ApiInternalServerErrorResponse({
    title: 'BoletoRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FileInterceptor('cobranca'))
  async handle(@UploadedFile() data: Express.Multer.File): Promise<void> {
    const fileContent = data.buffer.toString('utf-8');
    console.log(fileContent);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    await timeoutDelay(200);
  }
}
