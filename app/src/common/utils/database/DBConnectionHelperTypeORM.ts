import 'reflect-metadata';
import TYPES from '../../../module/TYPES';
import entities from './Entities';
import { DataSource } from 'typeorm';
import SecretsBase from '../aws/SecretsBase';
import { inject } from 'inversify/lib/annotation/inject';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { injectable } from 'inversify';
import EnvironmentHelper from '../helpers/EnvironmentHelper';

@injectable()
export default class DBConnectionHelperTypeORM {
	private dataSourceOptions?: PostgresConnectionOptions;

	constructor(
		@inject(TYPES.SecretsManager) private secretsManager: SecretsBase
	) {
		this.dataSourceOptions = {
			type: 'postgres',
      namingStrategy: new SnakeNamingStrategy(),
      entities,
      logging: true,
		}
	}

	async connect(): Promise<DataSource> {
		console.log('secrets name', EnvironmentHelper.SECRET_NAME);
		const credentials = await this.secretsManager.retrieveSecretValue<PostgresConnectionOptions>(EnvironmentHelper.SECRET_NAME ?? '');
		console.log('secret', credentials);
		this.dataSourceOptions = {
			...this.dataSourceOptions,
			...credentials
		}
		return await new DataSource(this.dataSourceOptions).initialize();
	}
}
