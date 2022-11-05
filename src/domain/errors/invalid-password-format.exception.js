import { DomainFormatException } from './domain-format.exception';

export class InvalidPasswordFormatException extends DomainFormatException {
  constructor() {
    super('Invalid password format');
  }
}
