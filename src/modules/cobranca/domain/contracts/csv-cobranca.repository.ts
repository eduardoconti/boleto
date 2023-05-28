import type {
  IFindOne,
  ISave,
  IUpdate,
} from '@domain-core/contracts/repository';

import type {
  ArquivoCobrancaEntity,
  ArquivoCobrancaProps,
} from '../entities/arquivo-cobranca.entity';

export type ICsvCobrancaRepository = ISave<ArquivoCobrancaEntity> &
  IFindOne<ArquivoCobrancaEntity, ArquivoCobrancaProps> &
  IUpdate<ArquivoCobrancaEntity>;
