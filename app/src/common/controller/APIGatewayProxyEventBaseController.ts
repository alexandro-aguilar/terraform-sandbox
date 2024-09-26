import 'reflect-metadata';
import Controller from './Controller';
import { injectable } from 'inversify';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import APIGatewayResult from '@commons/domain/dto/APIGatewayResult';
import Mapper from '@commons/domain/mapper/Mapper';

@injectable()
export default abstract class APIGatewayProxyEventBaseController<T = object> implements Controller<APIGatewayProxyEvent, APIGatewayResult<T>> {
  constructor(
    protected mapper: Mapper<T, APIGatewayResult<T>>
  ) { }

  protected abstract run(port: APIGatewayProxyEvent): Promise<T>;
  protected abstract validate(port: APIGatewayProxyEvent): Promise<void>;

  async execute(port?: APIGatewayProxyEvent): Promise<APIGatewayResult<T>> {
    await this.validate(port);
    const entityDto: T = await this.run(port);
    const response = this.mapper.execute(entityDto);
    return response;
  }
}