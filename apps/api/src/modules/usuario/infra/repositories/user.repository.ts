import { Injectable } from '@nestjs/common';

import type { QueryParams } from '@domain-core/contracts';
import type { Email } from '@domain-core/value-objects';
import { DateVO } from '@domain-core/value-objects';

import { PrismaService } from '@infra/database/prisma';

import type { IUserRepository } from '@usuario/domain/contracts/usuario-repository';
import type { UserEntity, UserProps } from '@usuario/domain/entities';

import { UserNotFoundException, UserRepositoryException } from '../exceptions';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(entity: UserEntity): Promise<UserEntity> {
    try {
      const model = UserModel.fromEntity(entity);

      const saved = await this.prismaService.user.create({
        data: model,
      });
      return UserModel.toEntity(saved);
    } catch (e) {
      throw new UserRepositoryException('failed to create user on database', e);
    }
  }

  async findOne(params: QueryParams<UserProps>): Promise<UserEntity> {
    const model = await this.prismaService.user
      .findFirst({
        where: {
          id: params.id?.value as string,
          email: params.email?.value,
        },
      })
      .catch((e) => {
        throw new UserRepositoryException('failed to find user on database', e);
      });

    if (!model) {
      throw new UserNotFoundException('user not found');
    }
    return UserModel.toEntity(model);
  }

  async findMany(): Promise<UserEntity[] | []> {
    const models = await this.prismaService.user.findMany({}).catch((e) => {
      throw new UserRepositoryException(
        'failed to findMany user on database',
        e,
      );
    });
    return models.map((e) => UserModel.toEntity(e));
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const { id, email, nome, senha } = UserModel.fromEntity(entity);
    try {
      const saved = await this.prismaService.user.update({
        data: {
          email,
          nome,
          senha,
          data_alteracao: DateVO.now().value,
        },
        where: { id },
      });
      return UserModel.toEntity(saved as UserModel);
    } catch (e) {
      throw new UserRepositoryException('failed to update user on database', e);
    }
  }

  async exists(email: Email): Promise<boolean> {
    const model = await this.prismaService.user
      .findUnique({
        where: {
          email: email.value,
        },
      })
      .catch((e: any) => {
        throw new UserRepositoryException('failed to find user on database', e);
      });

    if (!model) {
      return false;
    }
    return true;
  }
}
