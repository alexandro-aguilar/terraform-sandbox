import Joi from 'joi';
import Warning from '../utils/error/Warning';
import ErrorCode from '../utils/error/errorCode';
import HttpStatusCode from '../utils/enums/httpStatusCode';

/**
 * Enum for validation type
 * @readonly
 * @enum {VALIDATOR_TYPE}
 */

export enum VALIDATOR_TYPE {
  BODY = 'BODY',
  PATH = 'PATH',
  QUERY = 'QUERY',
}

/**
 * @function httpJoiValidatorMiddleware
 * @description Middleware to validate data
 * @param {ValidationInput} validationInput
 * @TODO Add option to validate multiple path params if required
 */
export interface ValidationInput {
  schema: Joi.ObjectSchema | Joi.ArraySchema | Joi.StringSchema;
  type: VALIDATOR_TYPE;
  pathParam?: string;
}

export const httpJoiValidatorMiddleware = (validationInput: ValidationInput) => {
  // console.log('validateData', validationInput);

  const validatorMiddleware = async (request: any) => {
    // const schema = validationInput.schemas[request.event.version];
    // console.log('schema', schema);
    try {
      // Validation for body
      if (validationInput.type === VALIDATOR_TYPE['BODY']) {
        await validationInput.schema.validateAsync(
          request.event.body,
          { abortEarly: false }
        );
      }

      // Validation for query
      if (validationInput.type === VALIDATOR_TYPE['QUERY']) {
        await validationInput.schema.validateAsync(
          request.event.queryStringParameters ? request.event.queryStringParameters : {},
          { abortEarly: false }
        );
      }

      // Validation for path
      if (validationInput.type === VALIDATOR_TYPE['PATH']) {
        await validationInput.schema.validateAsync(
          request.event.pathParameters[validationInput.pathParam ? validationInput.pathParam : 'id'],
          { abortEarly: false }
        );
      }
    } catch (err) {
      console.error('JOI ERR: ', err)

      const errorCodes = [];
      err.details.forEach( (detail: { message: string; }) => {
        if (ErrorCode[detail.message]){
          errorCodes.push(ErrorCode[detail.message]);
        }
      });
      if(errorCodes.length > 0){
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], errorCodes);
      }

      throw new Warning(HttpStatusCode.BAD_REQUEST, [], [ErrorCode.BAD_REQUEST]);
    }
  };

  return {
    before: validatorMiddleware,
  };
};

export default httpJoiValidatorMiddleware;

  // console.log('validateData', validationInput);

  