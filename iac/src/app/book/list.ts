
import { ApiGatewayMethodConfig } from '@cdktf/provider-aws/lib/api-gateway-method';
// import { ApiGatewayIntegrationConfig } from '@cdktf/provider-aws/lib/api-gateway-integration';


const method: Partial<ApiGatewayMethodConfig> = {
    httpMethod: 'GET',
    authorization: 'NONE',
}

export default {
    id: "list",
    http: {
        path: ["category", "{categoryId}", "author", "{authorId}"],
        method,
    }
}
