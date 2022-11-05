import { ApplicationConflictException } from './application-conflict.exception';

export class UserEmailAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('This email is already in use');
  }
}
