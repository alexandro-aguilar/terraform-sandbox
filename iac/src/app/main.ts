import IaCConfig from "../entity/config/IaCConfig";
import books from "./book/main"
import { ApiGatewayRestApiConfig } from "@cdktf/provider-aws/lib/api-gateway-rest-api";


const id = "library"
const stage = "local"
const region = "us-east-1"
const prefix = "demo"

const apiGatewayConfig: ApiGatewayRestApiConfig = {
    name: `${prefix}-${id}-${stage}`,
    description: "Library API",
    endpointConfiguration: {
        "types": ["REGIONAL"]
    },
}

const appConfig: IaCConfig = {
    id,
    region,
    prefix,
    stage,
    apiGatewayConfig,
    domains: [books]
};


export default appConfig;
