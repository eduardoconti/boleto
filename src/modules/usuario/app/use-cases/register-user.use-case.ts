import type { IUseCase } from '@domain-core/contracts';

import type { IUserRepository } from '../../domain/contracts/usuario-repository';
import { UserEntity } from '../../domain/entities';
import { Email } from '../../domain/value-objects';
import { UserAlreadyExistsException } from '../exceptions';

export type RegisterUserUseCaseOutput = Omit<
  RegisterUserUseCaseInput,
  'senha'
> & { id: string };
export interface RegisterUserUseCaseInput {
  nome: string;
  email: string;
  senha: string;
}

export type IRegisterUserUseCase = IUseCase<
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput
>;
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({
    nome,
    email,
    senha,
  }: RegisterUserUseCaseInput): Promise<RegisterUserUseCaseOutput> {
    if (await this.userRepository.exists(new Email(email))) {
      throw new UserAlreadyExistsException();
    }
    const userEntity = await UserEntity.create({
      nome,
      email,
      senha,
    });

    const saved = await this.userRepository.save(userEntity);
    const userProps = UserEntity.toPrimitives(saved);

    return {
      nome: userProps.nome,
      email: userProps.email,
      id: saved.id.value,
    };
  }
}
