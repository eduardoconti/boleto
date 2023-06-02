import type { ID } from '../value-objects';
import { DateVO } from '../value-objects';

export type UniqueEntityID = string | number;

export interface BaseEntityProps {
  id: ID<UniqueEntityID>;
  dataInclusao: DateVO;
  dataAlteracao: DateVO;
}
export interface CreateEntityProps<EntityProps> {
  id?: ID<UniqueEntityID>;
  props: EntityProps;
  dataInclusao?: DateVO;
  dataAlteracao?: DateVO;
}

export abstract class Entity<EntityProps> {
  public readonly props: EntityProps;
  protected readonly _dataInclusao: DateVO;
  protected readonly _updatedAt: DateVO;
  protected abstract _id: ID<UniqueEntityID>;

  constructor({
    id,
    dataInclusao,
    dataAlteracao,
    props,
  }: CreateEntityProps<EntityProps>) {
    if (id) this.setId(id);
    this.props = props;
    this._dataInclusao = dataInclusao ?? DateVO.now();
    this._updatedAt = dataAlteracao ?? DateVO.now();
  }

  get dataInclusao(): DateVO {
    return this._dataInclusao;
  }

  get dataAlteracao(): DateVO {
    return this._updatedAt;
  }

  private setId(id: ID<UniqueEntityID>): void {
    this._id = id;
  }
}
