import type { ISave } from '@domain-core/contracts/repository';

import type { WebhookEntity } from '../entities';

export type IWebhookRepository = ISave<WebhookEntity>;
