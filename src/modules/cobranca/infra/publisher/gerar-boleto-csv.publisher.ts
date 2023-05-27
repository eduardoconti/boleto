import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

import type {
  IPublisherCsvCobranca,
  ProcessarCsvCobrancaData,
} from '@cobranca/app/contracts';

export class GerarCobrancaPublisher implements IPublisherCsvCobranca {
  constructor(
    @Inject('publisher_csv_boleto')
    private readonly csvQueueService: ClientProxy,
  ) {}

  async publish(data: ProcessarCsvCobrancaData): Promise<void> {
    try {
      await this.csvQueueService
        .emit('PROCESSAR_CSV', data)
        .pipe(
          catchError((exception: Error) => {
            return throwError(new Error(exception.message));
          }),
        )
        .toPromise();
    } catch (error) {
      throw error;
    }
  }
}
