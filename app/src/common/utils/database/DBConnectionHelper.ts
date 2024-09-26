import { DataSource } from 'typeorm/data-source/DataSource';

export default interface DBConnectionHelper {
  connect(): Promise<DataSource>
}