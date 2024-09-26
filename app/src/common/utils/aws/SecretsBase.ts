export default interface SecretsBase {
  retrieveSecretValue<T>(secretName: string): Promise<T>;
}