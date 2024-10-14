import 'reflect-metadata';
import TYPES from '../TYPES';

import { inject, injectable } from 'inversify';
import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import FindManyPaginatedBaseRepositoryResponse from '@commons/domain/repository/FindManyPaginatedBaseRepositoryResponse';

import Book from '@module/book/list/entity/Book';
import UseCase from '@commons/useCase/UseCase';

@injectable()
export default class PaginatedBooksInMemoryManager implements UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>> {
  constructor(
    @inject(TYPES.PaginatedBooksUseCase) private usecase: UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>>,
  ) { }

  async execute(port?: PaginationQueryDTO): Promise<FindManyPaginatedBaseRepositoryResponse<Book>> {
    return this.usecase.execute(port);
  }
}