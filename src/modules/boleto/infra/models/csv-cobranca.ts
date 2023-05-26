import { DateVO, UUID } from '@domain-core/value-objects';

import { Model } from '@infra/database/model/base-model';

import { CsvCobrancaEntity } from '../../domain/entities';

export class CsvCobrancaModel extends Model {
  id!: string;
  caminho!: string;
  processado!: boolean;
  data_inclusao!: Date;
  data_alteracao!: Date;
  static fromEntity(entity: CsvCobrancaEntity): CsvCobrancaModel {
    return {
      id: entity.id.value,
      caminho: entity.caminho,
      processado: entity.processado,
      data_alteracao: entity.dataAlteracao.value,
      data_inclusao: entity.dataInclusao.value,
    };
  }

  static toEntity({
    id,
    caminho,
    processado,
    data_inclusao,
    data_alteracao,
  }: CsvCobrancaModel): CsvCobrancaEntity {
    return new CsvCobrancaEntity({
      id: new UUID(id),
      dataInclusao: new DateVO(data_inclusao),
      dataAlteracao: new DateVO(data_alteracao),
      props: {
        caminho,
        processado,
      },
    });
  }
}
