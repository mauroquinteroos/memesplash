import { ApplicationConflictException } from './application-conflict.exception.js';

export class UserIdAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('This ID is already in use');
  }
}
