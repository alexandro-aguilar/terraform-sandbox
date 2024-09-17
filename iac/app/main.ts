import books  from "./book/main"
import meetingRooms from "./meetingRooms"

// import { config as meetingRooms } from "./meeting_room/iac.ts"
import { ApiGatewayRestApiConfig } from '@cdktf/provider-aws/lib/api-gateway-rest-api';

const appId = "library"
const stage = "local"
const region = "us-east-1"
const prefix = "demo"

const apiGateway: ApiGatewayRestApiConfig = {
    name: `${prefix}-${appId}-${stage}`,
    description: "Library API",
    endpointConfiguration: {
        "types": ["REGIONAL"]
    },
    dependsOn: [],
}

export default {
    id: appId,
    prefix, 
    apiGateway,
    region,
    domains: [ books, meetingRooms ]
}
