import 'reflect-metadata';
import TYPES from '../TYPES';

import { inject, injectable } from 'inversify';
import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import FindManyPaginatedBaseRepositoryResponse from '@commons/domain/repository/FindManyPaginatedBaseRepositoryResponse';

import DBConnectionManager from '@commons/utils/database/DBConnectionManager';

import Book from '../entity/Book';
import UseCase from '@commons/useCase/UseCase';

  @injectable()
  export default class PaginatedBooksDatabaseManager implements  UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>> {
    constructor(
      @inject(TYPES.PaginatedBooksUseCase) private usecase:  UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>>,
      @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager,
    ) { }

    async execute(port?: PaginationQueryDTO): Promise<FindManyPaginatedBaseRepositoryResponse<Book>> {
      console.log('PaginatedBookUseCase execute', port);
      await this.dbConnectionManager.connect();
      try {
        return this.usecase.execute(port);
      } catch (error) {
        throw error;
      } finally {
        await this.dbConnectionManager.disconnect();
      }
    }
  }