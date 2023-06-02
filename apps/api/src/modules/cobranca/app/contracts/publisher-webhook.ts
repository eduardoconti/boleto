import type { IPublisher } from '@app/contracts/publisher';

import type { ProcessarWebhookData } from './processar-webhook';

export type IPublisherWebhook = IPublisher<ProcessarWebhookData>;
