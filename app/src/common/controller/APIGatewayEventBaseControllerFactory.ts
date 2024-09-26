import { Container } from 'inversify';
import Controller from './Controller';
import ErrorCode from '../utils/error/errorCode';
import Exception from '../utils/error/Exception';
import EventBaseControllerFactory from './EventBaseControllerFactory';
import HttpStatusCode from '../utils/enums/httpStatusCode';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import APIGatewayEventProxyBaseController from './APIGatewayProxyEventBaseController';

export default class APIGatewayEventBaseControllerFactory extends EventBaseControllerFactory<APIGatewayProxyEvent> {

  constructor(
    private readonly container: Container,
    private readonly event: APIGatewayProxyEvent,
    private readonly handlerTypes: { [key: string]: symbol }
  ) {
    super();
  }

    //Finds the version in the Accept header and sets default version if not found
  protected getVersion(event: APIGatewayProxyEvent): string {
    // console.log('event.headers', event.headers);
    const regex = /version=([\d.]+)/;
    const matches = event.headers['Accept']?.match(regex);
    console.log('matches', matches);
    const version = matches ? matches[1] : 'Default';
    console.log('version', version);
    return version;
  }

  public getInstance(): Controller {
    // console.log('APIGatewayEventBaseControllerFactory');
    const version = this.getVersion(this.event);

    if (!Object.keys(this.handlerTypes).includes(version)) throw new Exception(HttpStatusCode.BAD_REQUEST, [ErrorCode.ERR0017], []);
    const controller: APIGatewayEventProxyBaseController = this.container.get<APIGatewayEventProxyBaseController>(this.handlerTypes[version]);
    return controller;
  }
}