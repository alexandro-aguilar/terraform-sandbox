import 'reflect-metadata';
import schema from './PaginatedBookSchema';
import { inject, injectable } from 'inversify';
import TYPES from '../../TYPES';
import Validator from '@utils/request/Validator';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import Book from '../../entity/Book';
import Adapter from '@commons/adapter/Adapter';
import APIGatewayProxyEventBaseController from '@commons/controller/APIGatewayProxyEventBaseController';
import APIGatewayResult from '@commons/domain/dto/APIGatewayResult';
import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import PaginationResponseDTO from '@commons/domain/dto/PaginationResponseDTO';
import Mapper from '@commons/domain/mapper/Mapper';


export namespace controller {
  @injectable()
  export class PaginatedBook extends APIGatewayProxyEventBaseController<PaginationResponseDTO<Book>> {

    constructor(
      @inject(TYPES.PaginatedBooksAdapter) private readonly adapter: Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Book>>>,
      @inject(TYPES.ApiGatewayResultMapper) apiGatewayResultMapper: Mapper<PaginationResponseDTO<Book>, APIGatewayResult<PaginationResponseDTO<Book>>>
    ) {
      super(apiGatewayResultMapper);
    }

    protected async validate(port: APIGatewayProxyEvent): Promise<void> {
      const validator = new Validator({
        schema,
        event: port,
      });
      await validator.execute();
    }

    protected async run(port?: APIGatewayProxyEvent): Promise<PaginationResponseDTO<Book>> {
      console.log('PaginatedBookController1_0_0', port);
      const books: PaginationResponseDTO<Book> = await this.adapter.execute(
        new PaginationQueryDTO({ pageNumber: port.queryStringParameters?.pn, size: port.queryStringParameters?.ps }));
      return books;
    }
  }
}