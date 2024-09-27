import 'reflect-metadata';
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { TerraformStack } from "cdktf";
import IIaCProvider from "./IaCProvider";
import { injectable } from 'inversify';

@injectable()
export default class LocalIaCProvider implements IIaCProvider {

  public setStack(stack: TerraformStack) {

    // const localEndpoint = 'http://localhost:4566'
    const localEndpoint = process.env.LOCAL_ENDPOINT

    new AwsProvider(stack, 'AWS', {
      region: process.env.AWS_REGION,
      accessKey: 'test',  // Credenciales falsas para LocalStack
      secretKey: 'test',  // LocalStack no valida las credenciales
      s3UsePathStyle: true,  // Fuerza el estilo path para S3'localEndpoint'
      skipCredentialsValidation: true,
      skipRequestingAccountId: true,
      skipMetadataApiCheck: "true",
      endpoints: [
        {
          s3: localEndpoint,
          apigateway: localEndpoint,
          cloudwatch: localEndpoint,
          cloudformation: localEndpoint,
          dynamodb: localEndpoint,
          lambda: localEndpoint,
          rds: localEndpoint,
          iam: localEndpoint,
          sns: localEndpoint,
          sqs: localEndpoint,
        },
      ]
    });
  }


} 