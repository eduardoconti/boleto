import type { UniqueEntityID } from '@domain-core/contracts';

export abstract class Model<ID extends UniqueEntityID> {
  id!: ID;
  data_inclusao!: Date;
  data_alteracao!: Date;
}
