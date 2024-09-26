import { Connection, DataSource, ObjectLiteral, QueryBuilder, QueryRunner } from "typeorm";

type PostgresExplainParameters = {
  analyze?: boolean;
  verbose?: boolean;
  costs?: boolean;
  buffers?: boolean;
  timing?: boolean;
};

export default class QueryExecutionPlan {
  public static async execute <T extends ObjectLiteral>(
    qb: QueryBuilder<T>,
    connection: DataSource | QueryRunner,
    explainParameters: PostgresExplainParameters = {
      analyze: true,
      verbose: true,
      buffers: true,
    },
    format: 'text' | 'xml' | 'json' | 'yaml' = 'text'
  ) {
    console.log('QueryExecutionPlan');
    const boolParameters = Object.entries(explainParameters)
      .filter((argument): argument is [string, boolean] => typeof argument[1] === 'boolean')
      .map(([key, value]) => `${key} ${value}`);
  
    const explainParametersString = [
      ...boolParameters,
      `FORMAT ${format.toUpperCase()}`,
    ].join(', ').toUpperCase();
  
    const [originalQuery, queryParameters] = qb.getQueryAndParameters();
    const query = `EXPLAIN (${explainParametersString}) ${originalQuery}`;
    return connection.query(query, queryParameters);
  }
}