import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class GerarBoletoOutput {
  @ApiProperty({
    example: '34191.79001 01043.510047 91020.150008 5 88110000099999',
  })
  @IsString()
  linha_digitavel!: string;

  @ApiProperty({ example: '79e4a62e-a78c-4d76-a8fa-ce79e5f098a8' })
  @IsString()
  id!: string;

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
