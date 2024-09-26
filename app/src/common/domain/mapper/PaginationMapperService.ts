import PaginationMapperParams from '../dto/PaginationMapperParams';
import PaginationResponseDTO from '../dto/PaginationResponseDTO';
import BaseMapper from './BaseMapper';

export default class PaginationMapperService<T> extends BaseMapper<PaginationMapperParams<T>, PaginationResponseDTO<T>> {
  protected transform(port: PaginationMapperParams<T>): PaginationResponseDTO<T> {
    return {
      pageNumber: port.pageNumber,
      from: (port.pageNumber - 1) * port.size + 1,
      to: (port.pageNumber - 1) * port.size + Number(port.size),
      pageSize: port.size,
      lastPage: Math.ceil(port.total / port.size),
      totalItems: port.total,
      items: port.items
    }
  }
}