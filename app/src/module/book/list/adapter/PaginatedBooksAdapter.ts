import 'reflect-metadata';
import TYPES from '../TYPES';
import PaginatedAdapter from '@commons/adapter/PaginatedAdapter';

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
  export class PaginatedBooks extends PaginatedAdapter<Book, BookDto> {
    constructor(
      @inject(TYPES.BookMapper)  bookMapper: BaseMapper<Book, BookDto>,
      @inject(TYPES.PaginationMapper)  paginationMapper: BaseMapper<PaginationMapperParams<Array<BookDto>>, PaginationResponseDTO<Array<BookDto>>>,
      @inject(TYPES.PaginatedBooksInfrastructure) useCase: UseCase<PaginationQueryDTO, Promise<{ items: Book[], count: number }>>
    ) { 
      super(bookMapper, paginationMapper, useCase)
    }
  }
}