import { DomainFormatException } from './domain-format.exception';

export class InvalidNameFormatException extends DomainFormatException {
  constructor() {
    super('Invalid name format');
  }
}
