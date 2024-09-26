import { ApiGatewayRestApiConfig } from "@cdktf/provider-aws/lib/api-gateway-rest-api";

export default class IaCConfig {
    id!: string;
    stage!: "local" | "dev" | "qa" | "live";
    region!: string;
    prefix!: string;

    apiGatewayConfig?: ApiGatewayRestApiConfig;
    apiGatewayId?: string;
    
    lambdaExecutionRoleArn?: string;
    domains!: object[];

}
