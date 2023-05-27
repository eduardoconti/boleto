import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { SalvarCsvCobrancaUseCase } from '@cobranca/app/use-cases';
import { ISalvarCsvCobrancaUseCase } from '@cobranca/domain/use-cases';

import { UUID } from '@domain-core/value-objects';

import { ApiInternalServerErrorResponse } from '@infra/__docs__';
import { JwtAuthGuard } from '@infra/guard';

@ApiTags('cobranca')
@Controller('cobranca')
@UseGuards(JwtAuthGuard)
export class SalvarCsvCobrancaController {
  constructor(
    @Inject(SalvarCsvCobrancaUseCase)
    private readonly useCase: ISalvarCsvCobrancaUseCase,
  ) {}
  @Post('/csv')
  @ApiOperation({
    summary: 'Gerar cobrancas a partir de um csv',
    description: 'Rota para gerar cobrancas a partir do csv',
  })
  @ApiInternalServerErrorResponse({
    title: 'BoletoRepositoryException',
    detail: 'database error',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(
    FileInterceptor('cobranca', {
      storage: diskStorage({
        destination: './uploads/csv',
        filename: function (_req, file, cb) {
          const uniqueSuffix = UUID.generate().value;
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  async handle(
    @UploadedFile(new ParseFilePipe()) file: Express.Multer.File,
  ): Promise<void> {
    await this.useCase.execute({ caminho: file.path });
  }
}
