import SqsBase, { SqsMessageParameter } from './SqsBase';
import EnvironmentHelper from '../helpers/EnvironmentHelper';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
export default class SqsManager implements SqsBase {
  private sqsClient: SQSClient;

  constructor (
    region = EnvironmentHelper.REGION,
    apiVersion = '2012-11-05'
  ) {
    this.sqsClient = new SQSClient({ region, apiVersion });
  }

  async sendMessage(sqsMessage: SqsMessageParameter): Promise<any> {
    try {
      const command = new SendMessageCommand(sqsMessage);
      const response = await this.sqsClient.send(command);
      return response;
    } catch (error) {
      console.log('SqsManager error', error);
      throw error;
    }
  }
}