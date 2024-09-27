import 'reflect-metadata';
import TYPES from '../TYPES';

import { inject, injectable } from 'inversify';
import PaginationQueryDTO from'@commons/domain/dto/PaginationQueryDTO';

import FindManyPaginatedBaseRepositoryResponse from '@commons/domain/repository/FindManyPaginatedBaseRepositoryResponse';
import Book from '../entity/Book';
import Repository from '@commons/domain/repository/Repository';
import UseCase from '@commons/useCase/UseCase';


@injectable()
export default class PaginatedBooksUseCase implements  UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>> {
  constructor(
    @inject(TYPES.PaginatedBooksRepository) private repository: Repository<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>>
  ) { }

  async execute(port?: PaginationQueryDTO): Promise<FindManyPaginatedBaseRepositoryResponse<Book>> {
    console.log('PaginatedBookUseCase execute', port);
      const booksPage: FindManyPaginatedBaseRepositoryResponse<Book> = await this.repository.execute(port);
      return booksPage;
  }
}