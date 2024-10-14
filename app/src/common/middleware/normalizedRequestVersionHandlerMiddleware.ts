import Exception from '@utils/error/Exception';
import ErrorCode from '@utils/error/errorCode';
import HttpStatusCode from '@utils/enums/httpStatusCode';

const normalizedRequestVersionHandlerMiddleware = (versions: Array<string>) => {
  const middlewareBefore = (request: any) => {
    // console.log('httpRequestVersionHandlerMiddleware');
    const regex = /version=([\d.]+)/;
    const version = 'Default';
    console.log('version', version);
    if (!versions.includes(version)) throw new Exception(HttpStatusCode.BAD_REQUEST, [ErrorCode.ERR0017], []);
    request.event.version = version;
  };

  return {
    before: middlewareBefore,
  };
};

export default normalizedRequestVersionHandlerMiddleware;
