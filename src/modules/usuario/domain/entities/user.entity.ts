import { AggregateRoot } from '@domain-core/contracts';
import { Email, Nome, Senha, UUID } from '@domain-core/value-objects';

export interface UserProps {
  nome: Nome;
  email: Email;
  senha: Senha;
}

export interface UserPrimitivesProps {
  id: string;
  nome: string;
  email: string;
  senha: string;
  dataInclusao: Date;
  dataAlteracao: Date;
}

type CreateUserEntity = Pick<UserPrimitivesProps, 'nome' | 'email' | 'senha'>;

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id!: UUID;

  static async create({
    nome,
    email,
    senha,
  }: CreateUserEntity): Promise<UserEntity> {
    const id = UUID.generate();
    const entity = new UserEntity({
      id,
      props: {
        nome: new Nome(nome),
        email: new Email(email),
        senha: await Senha.hash(senha),
      },
    });

    return entity;
  }

  static toPrimitives({
    id,
    props,
    dataInclusao,
    dataAlteracao,
  }: UserEntity): UserPrimitivesProps {
    return {
      id: id.value,
      nome: props.nome.value,
      email: props.email.value,
      senha: props.senha.value,
      dataInclusao: dataInclusao.value,
      dataAlteracao: dataAlteracao.value,
    };
  }
}
