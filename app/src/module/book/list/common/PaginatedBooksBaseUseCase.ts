import 'reflect-metadata';

import UseCase from '@commons/useCase/UseCase';
import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import FindManyPaginatedBaseRepositoryResponse from '@commons/domain/repository/FindManyPaginatedBaseRepositoryResponse';

import Book from '../entity/Book';

export default interface PaginatedBooksBaseUseCase extends UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>> { }


