import { DateVO, Email, Nome, Senha, UUID } from '@domain-core/value-objects';

import { Model } from '@infra/database/model/base-model';

import { UserEntity } from '@usuario/domain/entities';

export class UserModel extends Model {
  nome!: string;
  email!: string;
  senha!: string;

  static fromEntity(userEntity: UserEntity): UserModel {
    const { id, nome, email, senha, dataInclusao, dataAlteracao } =
      UserEntity.toPrimitives(userEntity);

    return {
      id,
      nome,
      email,
      senha,
      data_inclusao: dataInclusao,
      data_alteracao: dataAlteracao,
    };
  }

  static toEntity({
    id,
    nome,
    email,
    senha,
    data_inclusao,
    data_alteracao,
  }: UserModel): UserEntity {
    return new UserEntity({
      id: new UUID(id),
      dataInclusao: new DateVO(data_inclusao),
      dataAlteracao: new DateVO(data_alteracao),
      props: {
        nome: new Nome(nome),
        email: new Email(email),
        senha: new Senha(senha),
      },
    });
  }
}
