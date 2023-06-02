import { BaseException, Status } from '@domain-core/exceptions';

export class FalhaAoCriarBoletoComItau extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
