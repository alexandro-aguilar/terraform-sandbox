import BaseMapper from './BaseMapper';
import APIGatewayResult from '../dto/APIGatewayResult';
import HttpStatusCode from '../../utils/enums/httpStatusCode';

export default class APIGatewayResultMapperService<T> extends BaseMapper<T, APIGatewayResult<T>> {
  protected transform(data: T, statusCode = HttpStatusCode.OK): APIGatewayResult<T> {
    return {
      statusCode,
      data
    }
  }
}