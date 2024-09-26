import Warning from '../utils/error/Warning';
import ErrorCode from '../utils/error/errorCode';
import Exception from '../utils/error/Exception';
import HttpStatusCode from '../utils/enums/httpStatusCode';
import { ResponseManager } from '../utils/response/ResponseManager';

const httpResponseHandlerMiddleware = () => {
  const responseManager = new ResponseManager();

  const middlewareAfter = (request: any) => {
    // console.log('request', request.response)
    const { response } = request;
    const statusCode = response?.statusCode || HttpStatusCode.OK;
    const data = response?.data || response;
    // console.log('data', data)
    request.response = responseManager.handleResponse(statusCode, data);
  };

  const middlewareOnError = (request: any) => {
    const { error } = request;
    console.log('ERROR: ', error);
    if (error instanceof Warning) {
      request.response = responseManager.handleErrorResponse(
        error.statusCode,
        error.errors,
        error.warnings,
        error.dataErrors,
      );
    } else if (error instanceof Exception) {
      request.response = responseManager.handleErrorResponse(error.statusCode, error.errors, error.warnings);
    } else {
      // TODO: Send error in development mode
      request.response = responseManager.handleErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000]);
    }
  };

  return {
    after: middlewareAfter,
    onError: middlewareOnError,
  };
};

export default httpResponseHandlerMiddleware;