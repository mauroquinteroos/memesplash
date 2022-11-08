import { DomainFormatException } from './domain-format.exception.js';

export class InvalidNameFormatException extends DomainFormatException {
  constructor() {
    super('Invalid name format');
  }
}
