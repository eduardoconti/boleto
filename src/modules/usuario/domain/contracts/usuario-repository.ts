import type {
  IFindMany,
  IFindOne,
  ISave,
  IUpdate,
} from '@domain-core/contracts/repository';

import type { UserEntity, UserProps } from '../entities';
import type { Email } from '../value-objects';

export interface IUserRepository
  extends ISave<UserEntity>,
    IUpdate<UserEntity>,
    IFindMany<UserEntity, UserProps>,
    IFindOne<UserEntity, UserProps> {
  exists(email: Email): Promise<boolean>;
}
