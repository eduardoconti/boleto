import { Controller, Get } from '@nestjs/common';

import { CobrancaService } from './cobranca.service';

@Controller()
export class CobrancaController {
  constructor(private readonly cobrancaService: CobrancaService) {}

  @Get()
  getHello(): string {
    return this.cobrancaService.getHello();
  }
}
