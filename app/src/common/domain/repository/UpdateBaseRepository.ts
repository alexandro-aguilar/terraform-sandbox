import 'reflect-metadata';
import { injectable } from 'inversify';
import { UpdateQueryBuilder } from 'typeorm';
import camelcaseKeysDeep from 'camelcase-keys-deep';
import HttpStatusCode from '../../../../shared/enums/HttpStatusCode';
import ErrorCode from '../../../../shared/error/ErrorCode';
import Warning from '../../../../shared/error/Warning';
import PostgresSQLErrorCodes from '../../../../shared/enums/PostgrestSQLErrorCodes';
import Repository from './Repository';

/**
 * @absract class UpdateBaseRepository
 * @template T
 * @implements Repository<T>
 * @description Base repository class to update one or many items
 * @author Daniel Campos
 * @created 2022-08-01
 * @updated 2022-10-18
 * @updatedBy Alexandro Aguilar
 */
@injectable()
export default abstract class UpdateBaseRepository<T> implements Repository<Partial<T>, T> {
  
  protected abstract buildQuery(port?: Partial<T>): Promise<UpdateQueryBuilder<T>>;

  /**
   * @function execute
   * @param {Partial<T | T[]>} port
   * @returns Promise<T>
   * @throws {Error}
   * @description Updates a new item
   * @belongsTo Repository
   */
  public async execute(port?: Partial<T>): Promise<T> {
    try {
      if (Array.isArray(port)) throw new Warning(HttpStatusCode.BAD_REQUEST)
      const query: UpdateQueryBuilder<T> = await this.buildQuery(port);
      const result = await query
        .updateEntity(true)
        .returning('*')
        .execute();
      return camelcaseKeysDeep(result.raw.at(0)) as T;
    } catch (error) {

      if (error.code === PostgresSQLErrorCodes.UNIQUE_VIOLATION)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.ERR0007);

      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION){
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001)
      }
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.BAD_REQUEST);
      if (error.code === undefined && error.statusCode == HttpStatusCode.NOT_FOUND) {
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
      }

      throw error;
    }
  }
}