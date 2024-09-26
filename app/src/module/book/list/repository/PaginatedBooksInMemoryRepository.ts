import 'reflect-metadata';
import { injectable } from 'inversify';

import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import FindManyPaginatedBaseRepositoryResponse from '@commons/domain/repository/FindManyPaginatedBaseRepositoryResponse';

import Book from '../entity/Book';
import Repository from '@commons/domain/repository/Repository';

  @injectable()
  export default class PaginatedBooksInMemoryRepository implements Repository<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>> {
    execute(_port?: PaginationQueryDTO<object>): Promise<FindManyPaginatedBaseRepositoryResponse<Book>> {
      const books: Book[] = [
        new Book('1', 'Book 1', 'Author 1'),
        new Book('2', 'Book 2', 'Author 2'),
        new Book('3', 'Book 3', 'Author 3'),
      ];

      const data = new FindManyPaginatedBaseRepositoryResponse<Book>(books, 3);
      return Promise.resolve(data);
    }
  }