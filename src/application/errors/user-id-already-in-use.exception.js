import { ApplicationConflictException } from './application-conflict.exception';

export class UserIdAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('User ID is already in use');
  }
}
