import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { SalvarCsvCobrancaUseCase } from '@boleto/app/use-cases/salvar-csv-cobranca.use-case';
import { ISalvarCsvCobrancaUseCase } from '@boleto/domain/use-cases/salvar-csv-cobranca-use-case.interface';

import { UUID } from '@domain-core/value-objects';

import { ApiInternalServerErrorResponse } from '@infra/__docs__';
import { JwtAuthGuard } from '@infra/guard';

@ApiTags('boleto')
@Controller('boleto')
@UseGuards(JwtAuthGuard)
export class SalvarCsvCobrancaController {
  constructor(
    @Inject(SalvarCsvCobrancaUseCase)
    private readonly useCase: ISalvarCsvCobrancaUseCase,
  ) {}
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
  async handle(@UploadedFile() file: Express.Multer.File): Promise<void> {
    await this.useCase.execute({ caminho: file.path });
  }
}
