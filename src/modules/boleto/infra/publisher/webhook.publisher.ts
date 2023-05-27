import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

import type {
  IPublisherWebhook,
  ProcessarWebhookData,
} from '@boleto/app/contracts';

export class WebhookPublisher implements IPublisherWebhook {
  constructor(
    @Inject('publisher_webhook')
    private readonly webhookQueueService: ClientProxy,
  ) {}

  async publish(data: ProcessarWebhookData): Promise<void> {
    try {
      await this.webhookQueueService
        .emit('PROCESSAR_WEBHOOK', data)
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
