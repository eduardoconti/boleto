import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { ProcessarCsvCobrancaData } from 'apps/cobranca/src/contracts';
import { catchError, firstValueFrom, throwError } from 'rxjs';

import type { IPublisherCsvCobranca } from '@cobranca/app/contracts';

export class GerarCobrancaPublisher implements IPublisherCsvCobranca {
  constructor(
    @Inject('publisher_csv_cobranca')
    private readonly csvQueueService: ClientProxy,
  ) {}

  async publish(data: ProcessarCsvCobrancaData): Promise<void> {
    try {
      await firstValueFrom(
        this.csvQueueService.emit('PROCESSAR_CSV', data).pipe(
          catchError((exception: Error) => {
            return throwError(() => new Error(exception.message));
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
