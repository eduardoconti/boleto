import type {
  IFindMany,
  IFindOne,
  ISave,
  IUpdate,
} from '@domain-core/contracts/repository';
import type { Email } from '@domain-core/value-objects';

import type { UserEntity, UserProps } from '../entities';

export interface IUserRepository
  extends ISave<UserEntity>,
    IUpdate<UserEntity>,
    IFindMany<UserEntity, UserProps>,
    IFindOne<UserEntity, UserProps> {
  exists(email: Email): Promise<boolean>;
}
