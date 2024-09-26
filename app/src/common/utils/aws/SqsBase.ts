type MessageAttributes = {
  DataType: string;
  StringValue: string;
};

type Attributes = {
  Title: MessageAttributes;
  Author: MessageAttributes;
  WeeksOn: MessageAttributes;
};

export type SqsMessageParameter = {
  DelaySeconds?: number;
  MessageAttributes?: Attributes;
  MessageBody: string;
  QueueUrl: string;
  MessageDeduplicationId?: string;
  MessageGroupId?: string;
};

export default interface SqsBase {
  sendMessage(sqsMessage: SqsMessageParameter): Promise<any>;
}