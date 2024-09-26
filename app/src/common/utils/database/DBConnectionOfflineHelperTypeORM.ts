import 'reflect-metadata';
import entities from './Entities';
import { DataSource } from 'typeorm';
import DBConnectionHelper from './DBConnectionHelper';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { injectable } from 'inversify/lib/annotation/injectable';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import EnvironmentHelper from '../helpers/EnvironmentHelper';


@injectable()
export default class DBConnectionOfflineHelperTypeORM implements DBConnectionHelper {
	private dataSourceOptions: PostgresConnectionOptions;

	constructor() {
    this.dataSourceOptions = {
      type: 'postgres',
      namingStrategy: new SnakeNamingStrategy(),
      entities,
      logging: true,
      host: EnvironmentHelper.DB_HOST,
      username: EnvironmentHelper.DB_USERNAME,
      password: EnvironmentHelper.DB_PASSWORD,
      database: EnvironmentHelper.DB_NAME,
      port: parseInt(EnvironmentHelper.DB_PORT ?? '5432', 10)
    };
  }

	async connect(): Promise<DataSource> {
		return await new DataSource(this.dataSourceOptions).initialize();
	}
}
