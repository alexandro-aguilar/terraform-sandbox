import { DataSource, QueryRunner } from 'typeorm';

export default interface DBConnectionManager {
    connect(): Promise<DataSource>;
    disconnect(): Promise<void>;
    endTransaction(): Promise<void>;
    getTransaction(): Promise<QueryRunner>;
    getActiveConnection(): Promise<DataSource | QueryRunner>;
}