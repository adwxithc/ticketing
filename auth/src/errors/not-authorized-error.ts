import { CustomError } from './custom-erro';

export class NotAuthorizedErro extends CustomError {
  statusCode = 401;
  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedErro.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
