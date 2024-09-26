import HttpStatusCode from '../enums/httpStatusCode';
import { ErrorType, DataErrorType } from '../error/BaseError';

interface BaseBody {
  data: object | DataErrorType[] | null;
  errors: ErrorType[];
  warnings: ErrorType[];
}

interface BaseResponse {
  statusCode: HttpStatusCode;
  headers: { [key: string]: any };
  body: string;
}

const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
  'Access-Control-Allow-Headers':
    'timestamp,tz,tenant-id,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  Version: '2022.6.14.1',
};

export class ResponseManager {
  private generateResponse(statusCode: HttpStatusCode, body: BaseBody): BaseResponse {
    return {
      statusCode,
      headers,
      body: JSON.stringify(body),
    };
  }

  public handleResponse(statusCode: HttpStatusCode, data: any): BaseResponse {
    console.log('ResponseManager: ', data)
    return this.generateResponse(statusCode, {
      data,
      warnings: [],
      errors: [],
    });
  }

  public handleErrorResponse(
    statusCode: HttpStatusCode,
    errors: ErrorType[] = [],
    warnings: ErrorType[] = [],
    dataError: DataErrorType[] | null = null,
  ): BaseResponse {
    return this.generateResponse(statusCode, {
      data: dataError,
      warnings,
      errors,
    });
  }
}
