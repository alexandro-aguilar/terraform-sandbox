import { ApiGatewayResource } from '@cdktf/provider-aws/lib/api-gateway-resource';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';

export class DomainEntity {
    apiGatewayRootRestApiResource!:ApiGatewayResource;
    lambdaExecutionRole!: IamRole;
}