import 'reflect-metadata';
import TYPES from '../TYPES';
import Adapter from '@commons/adapter/Adapter';

import { injectable, inject } from 'inversify';
import PaginationMapperParams from '@commons/domain/dto/PaginationMapperParams';
import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import PaginationResponseDTO from '@commons/domain/dto/PaginationResponseDTO';
import BaseMapper from '@commons/domain/mapper/BaseMapper';
import UseCase from '@commons/useCase/UseCase';

import Book from '../entity/Book'
import BookDto from '../entity/BookDto';

export namespace adapter {
  @injectable()
  export class PaginatedBooks implements Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Array<BookDto>>>> {
    constructor(
      @inject(TYPES.BookMapper) private bookMapper: BaseMapper<Book, BookDto>,
      @inject(TYPES.PaginationMapper) private paginationMapper: BaseMapper<PaginationMapperParams<Array<BookDto>>, PaginationResponseDTO<Array<BookDto>>>,
      @inject(TYPES.PaginatedBooksInfrastructure) private useCase: UseCase<PaginationQueryDTO, Promise<{ items: Book[], count: number }>>
    ) { }

    async execute(port?: PaginationQueryDTO): Promise<PaginationResponseDTO<Array<BookDto>>> {
      const { items: books, count } = await this.useCase.execute(port);
      const booksDto: Array<BookDto> = this.bookMapper.execute(books);

      const paginatedBooks: PaginationResponseDTO<Array<BookDto>> = this.paginationMapper.execute(new PaginationMapperParams(port.pageNumber, port.size, count, booksDto));
      return paginatedBooks;
    }
  }
}