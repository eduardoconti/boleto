import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Min } from 'class-validator';

import type { IGerarBoletoUseCaseInput } from '@boleto/domain/use-cases';

export class GerarBoletoInput {
  @ApiProperty({ example: 'Eduardo Conti' })
  @IsString()
  nome_devedor!: string;

  @ApiProperty({ example: '123' })
  @IsString()
  id_cobranca!: string;

  @ApiProperty({ example: 'es.eduardoconti@gmail.com' })
  @IsString()
  email!: string;

  @ApiProperty({ example: '123' })
  @IsString()
  id_psp!: string;

  @ApiProperty({ example: 9000, description: 'Valor da cobrança em centavos' })
  @IsInt()
  @Min(1)
  valor!: number;

  @ApiProperty()
  @IsDateString()
  data_vencimento!: Date;

  static toUseCaseInput({
    nome_devedor,
    id_cobranca,
    email,
    id_psp,
    valor,
    data_vencimento,
  }: GerarBoletoInput): IGerarBoletoUseCaseInput {
    return {
      dataVencimento: data_vencimento,
      email,
      idCobranca: id_cobranca,
      nomeDevedor: nome_devedor,
      pspId: id_psp,
      valor: valor,
    };
  }
}
