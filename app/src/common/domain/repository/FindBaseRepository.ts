import 'reflect-metadata';
import { injectable } from 'inversify';
import { SelectQueryBuilder } from 'typeorm';
import PostgresSQLErrorCodes from '@utils/enums/postgresSQLErrorCodes';
import HttpStatusCode from '@utils/enums/httpStatusCode';
import ErrorCode from '@utils/error/errorCode';
import Warning from '@utils/error/Warning';
import Exception from '@utils/error/Exception';

/**
 * @absract class FindBaseRepository
 * @param {ObjectType<T>} type
 * @param {DBConnectionManager} iDBConnectionManager
 * @template T
 * @implements FindBaseRepository<T>
 * @description Base repository class
 * @author Raul Dominguez
 * @created 2023-07-18
 * @updated 2023-07-18
 * @updatedBy Alex Aguilar
 */
@injectable()
export default abstract class FindBaseRepository<T> {
  protected abstract buildQuery(port?: T): Promise<SelectQueryBuilder<T>>;

  /**
   * @function execute
   * @returns Promise<T[]>
   * @throws {Error}
   * @description Finds all items
   * @belongsTo FindBaseRepository
   */
  //@Log()
  public async execute(): Promise<T[]> {
    //Connect to the database
    try {
      const query = await this.buildQuery() as SelectQueryBuilder<T>;
      const entities: T[] = await query.getMany();
      return entities;
    } catch (error) {
      console.log('🚀 ~ file: FindBaseRepository.ts ~ line 55 ~ execute ~ error', error);
      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.BAD_REQUEST);

      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }
}