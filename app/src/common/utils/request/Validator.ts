import Warning from '../error/Warning';
import ErrorCode from '../error/errorCode';
import HttpStatusCode from '@utils/enums/httpStatusCode';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import Schema from './Schema';

export interface ValidationInput {
  schema: Schema
  event: APIGatewayProxyEvent;
  pathParam?: string;
}

export default class Validator {

  constructor(
    private readonly validationInput: ValidationInput
  ) { }

  async execute() {

    console.log("============================================")
    console.log('Validator.execute')
    console.log("============================================")

    try {

      // Validation for body
      if (this.validationInput.schema.body) {
        console.log('this.validationInput.event.body', this.validationInput.event.body)
        await this.validationInput.schema.body.validateAsync(
          this.validationInput.event.body,
          { abortEarly: false }
        );
      }

      // Validation for query
      if (this.validationInput.schema.query) {
        console.log('this.validationInput.event.queryStringParameters', this.validationInput.event.queryStringParameters)
        await this.validationInput.schema.query.validateAsync(
          this.validationInput.event.queryStringParameters,
          { abortEarly: false }
        );
      }

      // Validation for path
      if (this.validationInput.schema.path) {
        console.log('this.validationInput.event.pathParameters', this.validationInput.event.pathParameters)
        await this.validationInput.schema.path.validateAsync(
          this.validationInput.event.pathParameters,
          { abortEarly: false }
        );
      }
    } catch (err) {
      console.error('Schema Valitation ERROR', this.validationInput.event, err)

      const errorCodes = [];
      err.details.forEach((detail: { message: string; }) => {
        if (ErrorCode[detail.message]) {
          errorCodes.push(ErrorCode[detail.message]);
        }
      });

      if (errorCodes.length > 0) {
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], errorCodes);
      }

      throw new Warning(HttpStatusCode.BAD_REQUEST, [], [ErrorCode.BAD_REQUEST]);
    }

  }

}