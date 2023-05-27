import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Min } from 'class-validator';

import type { IGerarCobrancaUseCaseInput } from '@cobranca/domain/use-cases';

export class GerarCobrancaInput {
  @ApiProperty({ example: 'Eduardo Conti' })
  @IsString()
  nome_devedor!: string;

  @ApiProperty({ example: 'es.eduardoconti@gmail.com' })
  @IsString()
  email!: string;

  @ApiProperty({ example: 9000, description: 'Valor da cobrança em centavos' })
  @IsInt()
  @Min(1)
  valor!: number;

  @ApiProperty()
  @IsDateString()
  data_vencimento!: Date;

  static toUseCaseInput({
    nome_devedor,
    email,
    valor,
    data_vencimento,
  }: GerarCobrancaInput): IGerarCobrancaUseCaseInput {
    return {
      dataVencimento: data_vencimento,
      email,
      nomeDevedor: nome_devedor,
      valor: valor,
    };
  }
}
