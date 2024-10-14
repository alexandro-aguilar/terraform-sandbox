import HttpStatusCode from '../enums/httpStatusCode';
import { BaseError, DataErrorType, ErrorType } from './BaseError';

export default class Warning extends BaseError {
  readonly statusCode: HttpStatusCode;

  constructor(
    statusCode: HttpStatusCode,
    errors?: ErrorType | ErrorType[],
    warnings?: ErrorType | ErrorType[],
    dataErrors?: DataErrorType | DataErrorType[],
  ) {
    super(errors, warnings, dataErrors);
    this.name = 'Warning';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, Warning.prototype);
  }
}
