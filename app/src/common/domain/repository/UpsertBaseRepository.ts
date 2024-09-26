import 'reflect-metadata';
import { injectable, unmanaged } from 'inversify';
import { DataSource, InsertResult } from 'typeorm';
import DBConnectionManager from '../../../../shared/database/DBConnectionManager';
//import Log from '../../../../../shared/utils/logger/implementation/Log';
import Warning from '../../../../shared/error/Warning';
import ErrorCode from '../../../../shared/error/ErrorCode';
import Exception from '../../../../shared/error/Exception';
import HttpStatusCode from '../../../../shared/enums/HttpStatusCode';
import PostgresSQLErrorCodes from '../../../../shared/enums/PostgresSQLErrorCodes';

export type ObjectType<T> = { new (): T } | Function; // eslint-disable-line

/**
 * @absract class UpserManyBaseRepository
 * @param {ObjectType<T>} type
 * @param {DBConnectionManager} iDBConnectionManager
 * @template T
 * @implements IUpsertManyBaseRepository<T>
 * @description Base repository class
 * @author Raul Dominguez
 * @created 2022-07-18
 * @updated 2022-07-18
 * @updatedBy Raul Dominguez
 */
@injectable()
export default abstract class UpserManyBaseRepository<T> {
  private type: ObjectType<T>;
  protected iDBConnectionManager: DBConnectionManager;

  constructor(@unmanaged() type: ObjectType<T>, @unmanaged() iDBConnectionManager: DBConnectionManager) {
    this.type = type;
    this.iDBConnectionManager = iDBConnectionManager;
  }

  /**
   * @function execute
   * @param {T[]} items
   * @returns Promise<InsertResult>
   * @throws {Error}
   * @description Update item
   * @belongsTo IUpsertManyBaseRepository
   */
  //@Log()
  public async execute(items: T[]): Promise<InsertResult> {
    try {
      //Connect to the database
      const connection: DataSource = await this.iDBConnectionManager.connect();

      const upsertedItems = await connection.getRepository(this.type).upsert(items, {
        conflictPaths: ['id'],
        skipUpdateIfNoValuesChanged: true,
      });

      return upsertedItems;
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