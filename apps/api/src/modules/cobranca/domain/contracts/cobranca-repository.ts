import type {
  IFindOne,
  ISave,
  IUpdate,
} from '@domain-core/contracts/repository';

import type { CobrancaEntity, CobrancaProps } from '../entities';

export interface ICobrancaRepository
  extends ISave<CobrancaEntity>,
    IUpdate<CobrancaEntity>,
    IFindOne<CobrancaEntity, CobrancaProps> {}
