import { DomainFormatException } from './domain-format.exception.js';

export class InvalidEmailFormatException extends DomainFormatException {
  constructor() {
    super('Invalid email format');
  }
}
