import type { Provider } from '@nestjs/common';

import { GerarBoletoUseCase } from '@boleto/app/use-cases';
import type { IBoletoRepository } from '@boleto/domain/contracts/boleto-repository';
import { BoletoRepository } from '@boleto/infra/repositories';

import { PrismaService } from '@infra/database/prisma';

export const provideGerarBoletoUseCase: Provider<GerarBoletoUseCase> = {
  provide: GerarBoletoUseCase,
  useFactory: (repository: IBoletoRepository) => {
    return new GerarBoletoUseCase(repository);
  },
  inject: [BoletoRepository],
};

export const provideBoletoRepository: Provider<BoletoRepository> = {
  provide: BoletoRepository,
  useFactory: (prismaService: PrismaService) => {
    return new BoletoRepository(prismaService);
  },
  inject: [PrismaService],
};
