import 'reflect-metadata';
import { injectable, unmanaged } from 'inversify';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import DBConnectionManager from '../../../../shared/database/DBConnectionManager';
//import Log from '../../../../../shared/utils/logger/implementation/Log';
import Warning from '../../../../shared/error/Warning';
import ErrorCode from '../../../../shared/error/ErrorCode';
import Exception from '../../../../shared/error/Exception';
import HttpStatusCode from '../../../../shared/enums/HttpStatusCode';
import PostgresSQLErrorCodes from '../../../../shared/enums/PostgresSQLErrorCodes';

export type ObjectType<T> = { new (): T } | Function; // eslint-disable-line

/**
 * @absract class HardDeleteBaseRepository
 * @param {ObjectType<T>} type
 * @param {DBConnectionManager} iDBConnectionManager
 * @template T
 * @implements IHardDeleteBaseRepository<T>
 * @description Base repository class
 * @author Raul Dominguez
 * @created 2022-07-18
 * @updated 2022-07-18
 * @updatedBy Raul Dominguez
 */
@injectable()
export default abstract class HardDeleteBaseRepository<T> {
  private type: ObjectType<T>;
  protected iDBConnectionManager: DBConnectionManager;

  constructor(@unmanaged() type: ObjectType<T>, @unmanaged() iDBConnectionManager: DBConnectionManager) {
    this.type = type;
    this.iDBConnectionManager = iDBConnectionManager;
  }

  /**
   * @function execute
   * @param {string | number} id
   * @returns Promise<void>
   * @throws {Error}
   * @description HardDelete item by id
   * @belongsTo IHardDeleteBaseRepository
   */
  //@Log()
  public async execute(id: string | number): Promise<void> {
    try {
      //Connect to the database
      const connection: DataSource = await this.iDBConnectionManager.connect();

      const query: SelectQueryBuilder<T> = connection.manager.createQueryBuilder(this.type, 'entity');
      await query.delete().from(this.type).where('entity.id = :id', { id }).execute();
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