export enum ApplicationMode {
  LOCAL_CLOUD = 'localcloud',
  LOCAL = 'local',
  STAGED = 'staged'
}

export default class EnvironmentHelper {

  public static readonly STAGE: string = process.env.STAGE ?? 'local'
  public static readonly MODE: string = process.env.STAGE === 'local' ? ApplicationMode.LOCAL : ApplicationMode.STAGED


  public static readonly REGION = process.env.REGION ?? 'us-east-1'



  public static readonly DB_USERNAME = process.env.DB_USERNAME ?? 'dev'
  public static readonly DB_PASSWORD = process.env.DB_PASSWORD ?? 'p4ssw0rd'
  public static readonly DB_HOST = process.env.DB_HOST ?? 'database'
  public static readonly DB_PORT = process.env.DB_PORT ?? '5432'
  public static readonly DB_NAME = process.env.DB_NAME ?? 'local'

  public static readonly SECRET_NAME = process.env.SecretDBName ?? 'SecretDBName'
}