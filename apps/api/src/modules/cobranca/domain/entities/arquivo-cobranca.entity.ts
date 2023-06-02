import { Entity } from '@domain-core/contracts';
import { UUID } from '@domain-core/value-objects';

export interface ArquivoCobrancaProps {
  caminho: string;
  processado: boolean;
}

export interface ArquivoCobrancaPrimitivesProps {
  id: string;
  caminho: string;
  processado: boolean;
  dataInclusao: Date;
  dataAlteracao: Date;
}

export class ArquivoCobrancaEntity extends Entity<ArquivoCobrancaProps> {
  protected readonly _id!: UUID;

  get id(): UUID {
    return this._id;
  }

  get caminho(): string {
    return this.props.caminho;
  }

  get processado(): boolean {
    return this.props.processado;
  }

  static create({
    caminho,
  }: Pick<ArquivoCobrancaPrimitivesProps, 'caminho'>): ArquivoCobrancaEntity {
    const id = UUID.generate();

    return new ArquivoCobrancaEntity({
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

  estaProcessado(): boolean {
    return this.processado;
  }
}
