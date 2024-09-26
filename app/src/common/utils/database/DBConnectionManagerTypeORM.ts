import 'reflect-metadata'
import TYPES from '../../../module/TYPES';
import ErrorCode from '../error/errorCode';
import Exception from '../error/Exception';
import { inject, injectable } from 'inversify';
import { DataSource, QueryRunner } from 'typeorm';
import HttpStatusCode from '../enums/httpStatusCode';
import DBConnectionManager from './DBConnectionManager';
import DBConnectionHelperFactory from './DBConnectionHelperFactory';
import DBConnectionHelper from './DBConnectionHelper';

@injectable()
export default class DBConnectionManagerTypeORM implements DBConnectionManager {
  private queryRunner?: QueryRunner;
  private connection?: DataSource;

  constructor(
    @inject(TYPES.DBConnectionFactory) private dbConnectionHelperFactory: DBConnectionHelperFactory
  ) {}

  public async connect(): Promise<DataSource> {
    try {
      console.log('🔌 ~ DBConnectionManager: Connect');

      if (!this.connection) {

        const dbConnectionHelper: DBConnectionHelper = this.dbConnectionHelperFactory.create();
        this.connection = await dbConnectionHelper.connect();

      } else if (!this.connection.isInitialized) {
        await this.connection.initialize();
      }
      console.log('🔌 ~ DBConnectionManager: Connected');
      return this.connection;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async beginTransaction(): Promise<QueryRunner> {
    try {
      console.log('🔌 ~ DBConnectionManager: Begin Transaction');
      await this.connect();

      if (!this.queryRunner || this.queryRunner.isReleased) {
        this.queryRunner = this.connection?.createQueryRunner();
        await this.queryRunner?.startTransaction();
      }

      console.log('🔌 ~ DBConnectionManager: Transaction created');
      if (!this.queryRunner) {
        throw new Error('QueryRunner is undefined');
      }
      return this.queryRunner;
    } catch (error) {
      console.error(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0016], []);
    }
  }

  async getConnection(): Promise<DataSource> {
    if (this.connection && this.connection.isInitialized) {
      return this.connection;
    } else {
      return this.connect();
    }
  }

  async getTransaction(): Promise<QueryRunner> {
    return this.queryRunner && !this.queryRunner.isReleased ? this.queryRunner : this.beginTransaction();
  }

  async getActiveConnection(): Promise<DataSource | QueryRunner> {
    return this.queryRunner && this.queryRunner.isTransactionActive ? this.getTransaction() : this.getConnection();
  }

  async endTransaction(): Promise<void> {
    try {
      console.log('🔌 ~ DBConnectionManager: End Transaction');
      await this.queryRunner?.release();
    } catch (error) {
      console.error(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0015], []);
    }
  }

  async disconnect(): Promise<void> {
    try {
      console.log('🔌 ~ DBConnectionManager: Disconnect');
      await this.connection?.destroy();
    } catch (error) {
      console.error(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000], []);
    }
  }
}