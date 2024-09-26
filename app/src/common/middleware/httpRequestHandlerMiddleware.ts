import jwt_decode from 'jwt-decode';

const httpRequestHandlerMiddleware = () => {
  const middlewareBefore = (request: any) => {
    // Remove 'Bearer' label
    const bearerAuthorizationHeader = request.event.headers.Authorization || request.event.authorizationToken ||request.event.headers.authorization;
    const authorizationHeader = bearerAuthorizationHeader?.replace('Bearer ', '');

    // Token in header strategy
    try {
      const token = jwt_decode(authorizationHeader.trim());
      request.event.user = token['cognito:username'] || '';
      request.event.email = token['email'] || '';
    } catch (error) {
      console.log('token error', error);
      request.event.user = {};
    }

    // Token not in header strategy
    if (Object.keys(request.event.user).length === 0) {
      try {
        const token = jwt_decode(authorizationHeader, { header: false });
        request.event.user = token;
      } catch (error) {
        console.error(error);
        request.event.user = {};
      }
    }
  };

  return {
    before: middlewareBefore,
  };
};

export default httpRequestHandlerMiddleware;
