import 'reflect-metadata';
import Repository from './Repository';
import { injectable } from 'inversify';
import { UpdateQueryBuilder } from 'typeorm';
import camelcaseKeysDeep from 'camelcase-keys-deep';
import PostgresSQLErrorCodes from 'src/utils/enums/postgresSQLErrorCodes';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import Exception from 'src/utils/error/Exception';
import Warning from 'src/utils/error/Warning';
import ErrorCode from 'src/utils/error/errorCode';

/**
 * @absract class SoftDeleteBaseRepository
 * @template T
 * @implements Repository<T, Promise<T>>
 * @description Base soft delete repository class which updates active property
 * @author Raul Dominguez
 * @created 2022-07-18
 * @updated 2022-10-24
 * @updatedBy Alexandro Aguilar
 */
@injectable()
export default abstract class SoftDeleteBaseRepository<T> implements Repository<T, Promise<T>> {

  protected abstract buildQuery(port?: T): Promise<UpdateQueryBuilder<T>>;

  /**
   * @function execute
   * @param {Partial<T>} port
   * @returns Promise<T>
   * @description Updates an item to soft delete it
   * @belongsTo Repository
   */
  public async execute(port: T): Promise<T> {
    try {
      const query: UpdateQueryBuilder<T> = await this.buildQuery(port);
      const result = await query
        .updateEntity(true)
        .returning('*')
        .execute();
      return camelcaseKeysDeep(result.raw.at(0)) as T;
    } catch (error) {
      console.error(error);
      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.BAD_REQUEST);

      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }
}