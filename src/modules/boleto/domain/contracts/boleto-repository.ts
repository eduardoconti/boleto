import type {
  IFindOne,
  ISave,
  IUpdate,
} from '@domain-core/contracts/repository';

import type { BoletoEntity, BoletoProps } from '../entities';

export interface IBoletoRepository
  extends ISave<BoletoEntity>,
    IUpdate<BoletoEntity>,
    IFindOne<BoletoEntity, BoletoProps> {}
