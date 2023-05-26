import type { ID } from '../value-objects';
import { DateVO } from '../value-objects';

export type UniqueEntityID = string;

export interface BaseEntityProps {
  id: ID;
  dataInclusao: DateVO;
  dataAlteracao: DateVO;
}
export interface CreateEntityProps<EntityProps> {
  props: EntityProps;
  id: ID;
  dataInclusao?: DateVO;
  dataAlteracao?: DateVO;
}

export abstract class Entity<EntityProps> {
  public readonly props: EntityProps;
  protected readonly _dataInclusao: DateVO;
  protected readonly _updatedAt: DateVO;
  protected abstract _id: ID;

  constructor({
    id,
    dataInclusao,
    dataAlteracao,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
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

  get id(): ID {
    return this._id;
  }

  private setId(id: ID): void {
    this._id = id;
  }
}
