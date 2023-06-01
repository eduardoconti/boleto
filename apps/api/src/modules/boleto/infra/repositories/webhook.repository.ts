import { Injectable } from '@nestjs/common';

import type { IWebhookRepository } from '@boleto/domain/contracts';
import type { WebhookEntity } from '@boleto/domain/entities';

import { PrismaService } from '@infra/database/prisma';

import { WebhookRepositoryException } from '../exceptions';
import { WebhookModel } from '../models';

@Injectable()
export class WebhookRepository implements IWebhookRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: WebhookEntity): Promise<WebhookEntity> {
    try {
      const model = WebhookModel.fromEntity(entity);

      const saved = await this.prismaService.webhook.create({
        data: model,
      });
      return WebhookModel.toEntity(saved as WebhookModel);
    } catch (e) {
      throw new WebhookRepositoryException(
        'failed to save csv info on database',
        e,
      );
    }
  }
}
