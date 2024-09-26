import IaCApiGatewayRuntime from "./IaCApiGatewayRuntime";
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';

export default class IaCRuntime {
    lambdaExecutionRoleArn!: string;
    apiGateway!: IaCApiGatewayRuntime;
    lambdaS3Bucket!: S3Bucket
}

