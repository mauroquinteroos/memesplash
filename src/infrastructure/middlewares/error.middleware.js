import { ApplicationConflictException } from '../../application/errors/application-conflict.exception.js';
import { DomainFormatException } from '../../domain/errors/domain-format.exception.js';
import { InfrastructureFormatException } from '../errors/infrastructure-format.exception.js';

export const errorMiddleware = (err, req, res, next) => {
  console.error('\x1b[0;31m' + err.message);

  if (err instanceof DomainFormatException || err instanceof InfrastructureFormatException) {
    return res.status(400).send(err.message);
  }

  if (err instanceof ApplicationConflictException) {
    return res.status(409).send(err.message);
  }

  return res.status(500).send('Error internal server');
};
