import { UserModel } from '../../domain/models/user.model.js';
import { UserRepository } from '../../infrastructure/repositories/user.repository.js';
import { UserEmailAlreadyInUseException } from '../errors/user-email-already-in-use.exception.js';
import { UserIdAlreadyInUseException } from '../errors/user-id-already-in-use.exception.js';

export const userRegisterUseCase = async (id, name, email, password) => {
  const newUser = await UserModel.create(id, name, email, password);

  const existingUserById = await UserRepository.findById(newUser.id);

  if (existingUserById) {
    throw new UserIdAlreadyInUseException();
  }

  const existingUserByEmail = await UserRepository.findByEmail(newUser.email);

  if (existingUserByEmail) {
    throw new UserEmailAlreadyInUseException();
  }

  await UserRepository.create(newUser);
};
