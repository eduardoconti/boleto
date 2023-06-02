import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class GerarCobrancaOutput {
  @ApiProperty({
    example: '34191.79001 01043.510047 91020.150008 5 88110000099999',
  })
  @IsString()
  linha_digitavel!: string;

  @ApiProperty({ example: 1 })
  @IsString()
  id!: number;

  @ApiProperty({ example: 'Eduardo Conti' })
  @IsString()
  nome_devedor!: string;

  @ApiProperty({ example: 9000, description: 'Valor da cobrança em centavos' })
  @IsInt()
  @Min(1)
  valor!: number;

  @ApiProperty()
  @IsDateString()
  data_vencimento!: Date;
}
