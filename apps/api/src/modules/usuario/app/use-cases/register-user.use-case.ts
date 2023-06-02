import { Email } from '@domain-core/value-objects/email.value-object';

import type { IUserRepository } from '@usuario/domain/contracts/usuario-repository';
import { UserEntity } from '@usuario/domain/entities';
import type {
  IRegisterUserUseCase,
  RegisterUserUseCaseInput,
  RegisterUserUseCaseOutput,
} from '@usuario/domain/use-cases';

import { UserAlreadyExistsException } from '../exceptions';

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
