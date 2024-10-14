import 'reflect-metadata';
import Adapter from '@commons/adapter/Adapter';

import PaginationMapperParams from '@commons/domain/dto/PaginationMapperParams';
import PaginationQueryDTO from '@commons/domain/dto/PaginationQueryDTO';
import PaginationResponseDTO from '@commons/domain/dto/PaginationResponseDTO';
import BaseMapper from '@commons/domain/mapper/BaseMapper';
import UseCase from '@commons/useCase/UseCase';


  export default class PaginatedAdapter<ENTITY, DTO> implements Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Array<DTO>>>> {
    constructor(
      private mapper: BaseMapper<ENTITY, DTO>,
      private paginationMapper: BaseMapper<PaginationMapperParams<Array<DTO>>, PaginationResponseDTO<Array<DTO>>>,
      private useCase: UseCase<PaginationQueryDTO, Promise<{ items: ENTITY[], count: number }>>
    ) { }

    async execute(port?: PaginationQueryDTO): Promise<PaginationResponseDTO<Array<DTO>>> {
      const { items: items, count } = await this.useCase.execute(port);
      const itemsDTO: Array<DTO> = this.mapper.execute(items);

      const paginatedBooks: PaginationResponseDTO<Array<DTO>> = this.paginationMapper.execute(new PaginationMapperParams(port.pageNumber, port.size, count, itemsDTO));
      return paginatedBooks;
    }
  }