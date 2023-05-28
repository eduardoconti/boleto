import { BaseException, Status } from '@domain-core/exceptions';

export class CsvCobrancaNotFoundException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
