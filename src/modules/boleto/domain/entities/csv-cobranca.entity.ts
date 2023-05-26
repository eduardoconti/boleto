import { Entity } from '@domain-core/contracts';
import { UUID } from '@domain-core/value-objects';

export type StatusCsvCobranca = 'PENDENTE' | 'PAGO';

export interface CsvCobrancaProps {
  caminho: string;
  processado: boolean;
}

export interface CsvCobrancaPrimitivesProps {
  id: string;
  caminho: string;
  processado: boolean;
  dataInclusao: Date;
  dataAlteracao: Date;
}

export class CsvCobrancaEntity extends Entity<CsvCobrancaProps> {
  protected readonly _id!: UUID;

  get caminho(): string {
    return this.props.caminho;
  }

  get processado(): boolean {
    return this.props.processado;
  }

  static create({
    caminho,
  }: Pick<CsvCobrancaPrimitivesProps, 'caminho'>): CsvCobrancaEntity {
    const id = UUID.generate();

    return new CsvCobrancaEntity({
      id: id,
      props: {
        caminho,
        processado: false,
      },
    });
  }

  marcarComoProcessado(): void {
    this.props.processado = true;
  }
}
