import 'reflect-metadata';
import Repository from './Repository';
import { injectable } from 'inversify';
import { InsertQueryBuilder } from 'typeorm';
import PostgresSQLErrorCodes from 'src/utils/enums/postgresSQLErrorCodes';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import ErrorCode from 'src/utils/error/errorCode';
import Warning from 'src/utils/error/Warning';
import Exception from 'src/utils/error/Exception';
import QueryExecutionPlan from './QueryExecutionPlan';
import EnvironmentHelper, { ApplicationMode } from 'src/utils/helpers/EnvironmentHelper';

/**
 * @absract class CreateOneBaseRepository
 * @template T
 * @implements Repository<T>
 * @description Base repository class
 * @author Daniel Campos
 * @created 2022-08-01
 * @updated 2022-10-15
 * @updatedBy Alexandro Aguilar
 */
@injectable()
export default abstract class CreateBaseRepository<T> implements Repository<Partial<T>, Promise<T>> {
  
  protected abstract buildQuery(port?: Partial<T> | Partial<T>[]): Promise<InsertQueryBuilder<T>>;

  /**
   * @function execute
   * @param {Partial<T | T[]>} port
   * @returns Promise<T>
   * @throws {Error}
   * @description Creates a new item
   * @belongsTo Repository
   */
  public async execute(port?: T): Promise<T>;
  public async execute(port?: T[]): Promise<T[]>;
  public async execute(port?: Partial<T> | Partial<T>[]): Promise<T | T[]> {
    // console.log('CreateBaseRepository', port);
    try {
      const query: InsertQueryBuilder<T> = await this.buildQuery(port)
      query.returning('*');

      const result = await query.execute();

      return Array.isArray(port) ? result.generatedMaps as T[] : result.generatedMaps.at(0) as T;
    } catch (error) {
      console.error('CreateBaseRepository error', error);
      if (error.code === PostgresSQLErrorCodes.UNIQUE_VIOLATION)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.ERR0007);
      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.BAD_REQUEST);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }
}
