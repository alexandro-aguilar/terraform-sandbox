import 'reflect-metadata';
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { TerraformStack } from "cdktf";
import IIaCProvider from "./IaCProvider";
import { injectable } from 'inversify';

@injectable()
export default class LocalIaCProvider implements IIaCProvider {

  public setStack(stack: TerraformStack) {

    new AwsProvider(stack, 'AWS', {
      accessKey: 'test',  // Credenciales falsas para LocalStack
      secretKey: 'test',  // LocalStack no valida las credenciales
      region: 'us-east-1',
      s3UsePathStyle: true,  // Fuerza el estilo path para S3
      skipCredentialsValidation: true,
      skipRequestingAccountId: true,
      skipMetadataApiCheck: "true",
      endpoints: [
        {
          s3: 'http://localhost:4566',
          apigateway: 'http://localhost:4566',
          cloudwatch: 'http://localhost:4566',
          cloudformation: 'http://localhost:4566',
          dynamodb: 'http://localhost:4566',
          lambda: 'http://localhost:4566',
          rds: 'http://localhost:4566',
          iam: 'http://localhost:4566',
          sns: 'http://localhost:4566',
          sqs: 'http://localhost:4566',
        },
      ]
    });
  }


} 