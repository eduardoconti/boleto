import type {
  IFindOne,
  ISave,
  IUpdate,
} from '@domain-core/contracts/repository';

import type { CsvCobrancaEntity, CsvCobrancaProps } from '../entities';

export type ICsvCobrancaRepository = ISave<CsvCobrancaEntity> &
  IFindOne<CsvCobrancaEntity, CsvCobrancaProps> &
  IUpdate<CsvCobrancaEntity>;
