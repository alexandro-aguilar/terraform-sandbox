import 'reflect-metadata';
import TYPES from '../TYPES';

import { injectable, inject } from 'inversify';
import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';

import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import FindManyPaginateBaseRepository from '@commons/domain/repository/FindManyPaginateBaseRepository';
import DBConnectionManager from '@commons/utils/database/DBConnectionManager';

import Book from '../entity/Book';
import Repository from '@commons/domain/repository/Repository';
import FindManyPaginatedBaseRepositoryResponse from '@commons/domain/repository/FindManyPaginatedBaseRepositoryResponse'

@injectable()
export default class PaginatedBooksRepository extends FindManyPaginateBaseRepository<Book> implements Repository<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager
  ) {
    super();
  }

  protected async buildQuery(port?: PaginationQueryDTO): Promise<SelectQueryBuilder<Book>> {
    // console.log('CoupleFindPaginatedRepository buildQuery', port);
    const connection: DataSource | QueryRunner = await this.dbConnectionManager.getActiveConnection();
    const queryBuilder = connection.manager.createQueryBuilder()
      .select(['id','title', 'author', 'category'])
      .from(Book, 'book')
      .where('book.active = :active', { active: true })
    if (port?.order)
      queryBuilder.orderBy(`book.${port.order.field}`, port.order.direction);
    return queryBuilder;
  }
}
