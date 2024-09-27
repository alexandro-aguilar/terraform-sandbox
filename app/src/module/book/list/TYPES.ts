import TYPES from '../TYPES';

export default {
  ...TYPES,

  //Version handler symbols for Controller Factory
  'version@*.*.*': Symbol.for('DefaultController'),
  'version@1.0.0': Symbol.for('BookController_v1.0.0'),

  PaginatedBooksInfrastructure: Symbol.for('PaginatedBooksInfrastructure'),
  PaginatedBooksUseCase: Symbol.for('PaginatedBooksUseCase'),
  PaginatedBooksRepository: Symbol.for('PaginatedBooksRepository'),
  
  BookMapper: Symbol.for('BookMapper'),
  PaginatedBooksAdapter: Symbol.for('PaginatedBooksAdapter'),

}