import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

import type { IReceberWebhookUseCaseInput } from '@boleto/domain/use-cases';

export class WebhookItauInput {
  @ApiProperty({ example: 'Eduardo Conti' })
  @IsString()
  paidBy!: string;

  @ApiProperty({ example: '123' })
  @IsString()
  debtId!: string;

  @ApiProperty({ example: 900.01 })
  paidAmount!: number;

  @ApiProperty()
  @IsDateString()
  paidAt!: Date;

  static toUseCaseInput({
    paidBy,
    debtId,
    paidAmount,
    paidAt,
  }: WebhookItauInput): IReceberWebhookUseCaseInput {
    return {
      dataPagamento: paidAt,
      idCobranca: debtId,
      nomePagador: paidBy,
      valorPago: paidAmount,
      payload: JSON.stringify({
        paidBy,
        debtId,
        paidAmount,
        paidAt,
      }),
    };
  }
}
