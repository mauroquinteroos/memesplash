import { UserRepository } from '../../infrastructure/repositories/user.repository.js';
import { InvalidLoginException } from '../errors/invalid-login.exception.js';
import { compare } from 'bcrypt';

export const userLoginUseCase = async (email, password) => {
  const existingUser = await UserRepository.findByEmail(email);

  if (!existingUser) {
    throw new InvalidLoginException();
  }

  const didPasswordMatch = await compare(password, existingUser.password);

  if (!didPasswordMatch) {
    throw new InvalidLoginException();
  }

  return existingUser.id;
};
