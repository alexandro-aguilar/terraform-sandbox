import 'reflect-metadata';
import { injectable } from 'inversify';
import SecretsBase from './SecretsBase';
import { SecretsManagerClient, GetSecretValueCommand, GetSecretValueCommandInput } from '@aws-sdk/client-secrets-manager';

@injectable()
export default class SecretsManager implements SecretsBase {
  private secretsManagerClient: SecretsManagerClient;

  constructor(
    region = process.env.REGION,
  ) {
    this.secretsManagerClient = new SecretsManagerClient({ region });
  }

  async retrieveSecretValue<T>(secretName: string): Promise<T> {
    const commandInput: GetSecretValueCommandInput = {
      SecretId: secretName
    }

    const secret = await this.secretsManagerClient.send(new GetSecretValueCommand(commandInput));
    const secretValue = JSON.parse(secret.SecretString);
    return {
      ...secretValue,
      database: secretValue.dbname
    };
  }
}