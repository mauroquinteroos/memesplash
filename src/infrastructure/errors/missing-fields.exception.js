import { InfrastructureFormatException } from './infrastructure-format.exception.js';

export class MissingFieldsFormatException extends InfrastructureFormatException {
  constructor() {
    super('Missing obligatory fields');
  }
}
