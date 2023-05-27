import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

import type { ProcessarCsvData } from '@boleto/app/contracts';
import type { IPublisherCsv } from '@boleto/app/contracts/publisher-csv';

export class GerarBoletoCsvPublisher implements IPublisherCsv {
  constructor(
    @Inject('publisher_csv_boleto')
    private readonly csvQueueService: ClientProxy,
  ) {}

  async publish(data: ProcessarCsvData): Promise<void> {
    try {
      await this.csvQueueService
        .emit('PROCESSAR_CSV', data)
        .pipe(
          catchError((exception: Error) => {
            console.log(exception);
            return throwError(new Error(exception.message));
          }),
        )
        .toPromise();
    } catch (error) {
      throw error;
    }
  }
}
