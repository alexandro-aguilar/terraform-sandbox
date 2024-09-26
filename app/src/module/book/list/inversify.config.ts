import { Container } from 'inversify';
import TYPES from './TYPES';
import UseCase from '@commons/useCase/UseCase';
import DBConnectionManager from '@commons/utils/database/DBConnectionManager';
import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import BaseMapper from '@commons/domain/mapper/BaseMapper';
import DBConnectionManagerTypeORM from '@commons/utils/database/DBConnectionManagerTypeORM';
import PaginationResponseDTO from '@commons/domain/dto/PaginationResponseDTO';
import PaginationMapperParams from '@commons/domain/dto/PaginationMapperParams';
import PaginationMapperService from '@commons/domain/mapper/PaginationMapperService';
import DBConnectionHelperFactory from '@commons/utils/database/DBConnectionHelperFactory';
import SecretsBase from '@commons/utils/aws/SecretsBase';
import SecretsManager from '@commons/utils/aws/SecretsManager';

//

import Book from './entity/Book';
import BookDto from './entity/BookDto';
import BookMapper from './entity/BookMapper';

import { adapter} from './adapter/PaginatedBooks.adapter';
import APIGatewayResultMapperService from '@commons/domain/mapper/APIGatewayResultMapperService';

import PaginatedBooksDatabaseManager from './infrastructure/PaginatedBookDatabase';
import PaginatedBooksUseCase from './usecase/PaginatedBookUseCase';
// import PaginatedBooksRepository from './repository/PaginatedBookRepository';
import PaginatedBooksInMemoryRepository from './repository/PaginatedBooksInMemoryRepository';

import { controller as controller_v1 } from './controller/1.0.0/PaginatedBook.controller';
import FindManyPaginatedBaseRepositoryResponse from '@commons/domain/repository/FindManyPaginatedBaseRepositoryResponse';
import Repository from '@commons/domain/repository/Repository';

const container: Container = new Container();
container.bind<Container>(Container).toConstantValue(container);

// Versioning
// @see Version handler middleware
container.bind(TYPES.Default).to(controller_v1.PaginatedBook);
container.bind(TYPES['1.0.0']).to(controller_v1.PaginatedBook);

container.bind<SecretsBase>(TYPES.SecretsManager).to(SecretsManager);
container.bind(TYPES.ApiGatewayResultMapper).to(APIGatewayResultMapperService);

container.bind<BaseMapper<PaginationMapperParams<Array<BookDto>>, PaginationResponseDTO<Array<BookDto>>>>(TYPES.PaginationMapper).to(PaginationMapperService);

container.bind<DBConnectionHelperFactory>(TYPES.DBConnectionFactory).to(DBConnectionHelperFactory).inSingletonScope();
container.bind<DBConnectionManager>(TYPES.DBConnectionManager).to(DBConnectionManagerTypeORM).inSingletonScope();

container.bind<UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>>>(TYPES.PaginatedBooksInfrastructure).to(PaginatedBooksDatabaseManager);
container.bind<UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>>>(TYPES.PaginatedBooksUseCase).to(PaginatedBooksUseCase);
container.bind<Repository<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryResponse<Book>>>>(TYPES.PaginatedBooksRepository).to(PaginatedBooksInMemoryRepository);

container.bind<BaseMapper<Book, BookDto>>(TYPES.BookMapper).to(BookMapper);
container.bind(TYPES.PaginatedBooksAdapter).to(adapter.PaginatedBooks);

export default container;