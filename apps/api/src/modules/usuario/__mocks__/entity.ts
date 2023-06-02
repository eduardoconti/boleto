import { DateVO, Email, Nome, Senha, UUID } from '@domain-core/value-objects';

import { UserEntity } from '../domain/entities';

export const mockUserEntity = new UserEntity({
  id: new UUID('b85381d7-174f-4c0a-a2c8-aa93a399965d'),
  dataInclusao: new DateVO(new Date()),
  dataAlteracao: new DateVO(new Date()),
  props: {
    nome: new Nome('Eduardo Conti'),
    email: new Email('es.eduardoconti@gmail.com'),
    senha: new Senha(
      '$2b$10$QpOBIm7/vj8Xj07uQElgK.hWowRENs/qhHiDJsCtwIh5zxxobVzG2',
    ),
  },
});
