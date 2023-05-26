import type { ISave } from '@domain-core/contracts/repository';

import type { CsvCobrancaEntity } from '../entities';

export type ICsvCobrancaRepository = ISave<CsvCobrancaEntity>;
