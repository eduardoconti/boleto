import { BaseException, Status } from '@domain-core/exceptions';

export class CsvCobrancaRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
