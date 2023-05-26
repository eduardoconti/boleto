import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

import type { IPublisher } from '@app/contracts/publisher';

import type { ProcessarCsvData } from '@boleto/app/contracts';

export class GerarBoletoCsvPublisher implements IPublisher<ProcessarCsvData> {
  constructor(
    @Inject('MATH_SERVICE')
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
